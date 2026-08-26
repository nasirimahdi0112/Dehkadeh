const windowLengthMs = 60_000;
const maxRequestsPerWindow = 30;
const maxConcurrentRequests = 3;
const requestTimes: number[] = [];
let activeRequests = 0;

export function acquireAiRequest(): () => void {
  const now = Date.now();
  while (requestTimes[0] !== undefined && requestTimes[0] <= now - windowLengthMs) {
    requestTimes.shift();
  }

  if (activeRequests >= maxConcurrentRequests || requestTimes.length >= maxRequestsPerWindow) {
    throw new Error('AI request limit reached. Please try again shortly.');
  }

  activeRequests += 1;
  requestTimes.push(now);

  return () => {
    activeRequests = Math.max(0, activeRequests - 1);
  };
}