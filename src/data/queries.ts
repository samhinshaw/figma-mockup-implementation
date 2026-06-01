import { useQuery } from "@tanstack/react-query";

import {
  mockHero,
  mockOrdersOverview,
  mockProjects,
  mockQuarterly,
  mockSalesExpenses,
  mockSalesTotal,
  mockStatWidgets,
  mockTrafficSources,
  mockUserActivity,
} from "./mock";

/**
 * Mock query layer. Each section of the dashboard has its own hook so it can
 * load and show a skeleton independently. There is no real API — `mockFetch`
 * just resolves the canned fixture after a short, slightly staggered delay so
 * the loading → reveal experience feels like a real app.
 */
function mockFetch<T>(data: T, delayMs: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}

export function useHero() {
  return useQuery({
    queryKey: ["hero"],
    queryFn: () => mockFetch(mockHero, 250),
  });
}

export function useStatWidgets() {
  return useQuery({
    queryKey: ["stat-widgets"],
    queryFn: () => mockFetch(mockStatWidgets, 350),
  });
}

export function useOrdersOverview() {
  return useQuery({
    queryKey: ["orders-overview"],
    queryFn: () => mockFetch(mockOrdersOverview, 350),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => mockFetch(mockProjects, 500),
  });
}

export function useSalesExpenses() {
  return useQuery({
    queryKey: ["sales-expenses"],
    queryFn: () =>
      mockFetch({ total: mockSalesTotal, points: mockSalesExpenses }, 450),
  });
}

export function useUserActivity() {
  return useQuery({
    queryKey: ["user-activity"],
    queryFn: () => mockFetch(mockUserActivity, 500),
  });
}

export function useTrafficSources() {
  return useQuery({
    queryKey: ["traffic-sources"],
    queryFn: () => mockFetch(mockTrafficSources, 550),
  });
}

export function useQuarterly() {
  return useQuery({
    queryKey: ["quarterly"],
    queryFn: () => mockFetch(mockQuarterly, 600),
  });
}
