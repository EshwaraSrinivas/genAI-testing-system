export interface Scenario {
  feature: string;
  scenarios: { title: string; steps: string[] }[];
}