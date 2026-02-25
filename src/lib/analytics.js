import { ANALYTICS_BUTTONS, ANALYTICS_NAMESPACE } from './analyticsConfig';

const API_BASE_URL = 'https://api.counterapi.dev/v1';
const VISIT_SESSION_KEY = 'portfolio1-visit-tracked';

const normalizeCounterName = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'unknown';

const formatDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const requestCounter = async (path, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      mode: 'cors',
      keepalive: Boolean(options.keepalive),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
};

export const incrementCounter = async (counterName, options = {}) => {
  const safeCounter = normalizeCounterName(counterName);
  const result = await requestCounter(
    `/${ANALYTICS_NAMESPACE}/${safeCounter}/up`,
    options,
  );

  return Number(result?.count || 0);
};

export const getCounterValue = async (counterName) => {
  const safeCounter = normalizeCounterName(counterName);
  const result = await requestCounter(`/${ANALYTICS_NAMESPACE}/${safeCounter}/`);

  return Number(result?.count || 0);
};

export const trackVisit = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (sessionStorage.getItem(VISIT_SESSION_KEY)) {
    return;
  }

  sessionStorage.setItem(VISIT_SESSION_KEY, '1');
  const dayKey = formatDateKey();

  await Promise.all([
    incrementCounter('visits-total', { keepalive: true }),
    incrementCounter(`visits-day-${dayKey}`, { keepalive: true }),
  ]);
};

export const trackButtonClick = async (buttonKey) => {
  const safeButtonKey = normalizeCounterName(buttonKey);
  const dayKey = formatDateKey();

  await Promise.all([
    incrementCounter(`click-${safeButtonKey}`, { keepalive: true }),
    incrementCounter(`click-${safeButtonKey}-day-${dayKey}`, { keepalive: true }),
    incrementCounter('click-total', { keepalive: true }),
  ]);
};

const createLastNDays = (days) =>
  Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - index));

    return {
      key: formatDateKey(date),
      label: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    };
  });

export const loadAnalyticsSnapshot = async () => {
  const dayBuckets = createLastNDays(7);

  const [totalVisits, totalClicks, dailyVisitCounts, buttonCounts] = await Promise.all([
    getCounterValue('visits-total'),
    getCounterValue('click-total'),
    Promise.all(dayBuckets.map((day) => getCounterValue(`visits-day-${day.key}`))),
    Promise.all(
      ANALYTICS_BUTTONS.map((button) =>
        getCounterValue(`click-${button.key}`),
      ),
    ),
  ]);

  return {
    totalVisits,
    totalClicks,
    dailyVisits: dayBuckets.map((day, index) => ({
      ...day,
      count: dailyVisitCounts[index],
    })),
    buttonClicks: ANALYTICS_BUTTONS.map((button, index) => ({
      ...button,
      count: buttonCounts[index],
    })),
  };
};
