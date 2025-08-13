export type JobMarker = {
    id: string;
    title: string;       // e.g., "Interior Painting"
    payout: number;      // dollars
    distanceMiles: number;
    lat: number;
    lng: number;
  };
  
  export type Job = {
    id: string;
    customer: string;
    category: string;
    price: number;
    status: "confirmed" | "pending";
    start: string; end: string;
    area: string; distanceMiles: number;
    lat?: number; lng?: number;
  };
  
  export async function fetchContractorHome() {
    // replace with real endpoint e.g., /api/pro/home
    // return await fetch(...).then(r => r.json())
    await new Promise(r => setTimeout(r, 250)); // simulate
    return {
      weekly: { jobs: 8, earnings: 1240, rating: 4.9, responseMins: 2, name: "Mike", city: "Seattle", isOnline: true },
      todays: [
        { id: "1", customer: "Sarah Johnson", category: "House Cleaning", price: 120, status: "confirmed", start: "2:00 PM", end: "4:00 PM", area: "Downtown Seattle", distanceMiles: 0.8, lat: 47.6069, lng: -122.332 },
        { id: "2", customer: "Mike Chen", category: "Landscaping", price: 280, status: "confirmed", start: "4:30 PM", end: "7:00 PM", area: "Capitol Hill", distanceMiles: 1.2, lat: 47.6231, lng: -122.318 },
      ] as Job[],
      nearby: [
        { id: "3", title: "Interior Painting", payout: 450, distanceMiles: 2.1, lat: 47.615, lng: -122.345 },
        { id: "4", title: "Handyman Services", payout: 95, distanceMiles: 1.5, lat: 47.634, lng: -122.357 },
      ] as JobMarker[],
    };
  }
  
  export async function setOnlineStatus(online: boolean) {
    // POST to /api/pro/status
    await new Promise(r => setTimeout(r, 200));
    return { ok: true, online };
  }
  