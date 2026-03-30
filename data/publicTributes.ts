export interface PublicTribute {
  id: string;
  source: string;
  sourceDetail?: string;
  excerpt: string;
  date?: string;
  url?: string;
}

/*
 * Sourced from publicly available statements and tribute articles.
 * Excerpts are condensed for readability. Where no direct quote
 * was available, a factual summary is used and marked accordingly.
 */
export const publicTributes: PublicTribute[] = [
  {
    id: "sanef",
    source: "SANEF",
    sourceDetail: "South African National Editors' Forum",
    excerpt:
      "SANEF mourned the passing of Terry Bell, describing him as a veteran journalist who upheld the highest standards of independent, fearless journalism. A principled voice for press freedom, Terry spent decades holding power to account and mentoring a generation of journalists who followed in his footsteps.",
    date: "March 2026",
  },
  {
    id: "government",
    source: "South African Government",
    sourceDetail: "via SA News Agency (SANEWS)",
    excerpt:
      "The South African government paid tribute to Terry Bell as a struggle stalwart and veteran journalist who dedicated his life to opposing apartheid and upholding democratic values. Government noted his decades of exile, his return to a free South Africa, and his continued commitment to truth and accountability.",
    date: "March 2026",
    url: "https://www.sanews.gov.za/south-africa/government-pays-tribute-struggle-stalwart-terry-bell",
  },
  {
    id: "vavi",
    source: "Zwelinzima Vavi",
    sourceDetail: "SAFTU General Secretary",
    excerpt:
      "Vavi and SAFTU remembered Terry Bell as a \"dear comrade\" and a consistent, fearless voice for South Africa's working class. His Inside Labour column was essential reading for the labour movement over many years, and he never wavered in his commitment to workers' rights and social justice.",
    date: "March 2026",
  },
  {
    id: "groundup",
    source: "GroundUp",
    sourceDetail: "Alide Dasnois, Editor",
    excerpt:
      "\"Terry Bell was a big man. Big in size, big in heart, and big in intellect. He was also a ballet dancer who danced well into his seventies — a fabulous storyteller, a man who loved coffee and the surf and red wine and philosophical discussions.\" A force for good in the world.",
    date: "March 2026",
    url: "https://groundup.org.za/article/terry-bell-was-a-force-for-good-in-the-world/",
  },
  {
    id: "dailymaverick",
    source: "Daily Maverick",
    sourceDetail: "Editorial tribute",
    excerpt:
      "Daily Maverick remembered Terry Bell as someone who \"spoke truth to power until the very end\" — maintaining his personal blog, writing and engaging publicly until just six days before his passing. His legacy is one of uncompromising intellectual honesty and a lifelong commitment to justice.",
    date: "March 2026",
    url: "https://www.dailymaverick.co.za/article/2026-03-26-the-legacy-of-terry-bell-speaking-truth-to-power-until-the-very-end/",
  },
  {
    id: "mellet",
    source: "Patric Tariq Mellet",
    sourceDetail: "Public historian",
    excerpt:
      "\"From exile days to the present, Terry Bell always, with no holds barred, spoke his mind. Sometimes one agreed and sometimes disagreed, but at all times admired his feisty voice, always willing to challenge and speak truth to power.\"",
  },
];
