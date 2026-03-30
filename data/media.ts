export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface MemoryCard {
  id: string;
  title: string;
  /** Preview text — always shown */
  body: string;
  /** Full text — if present, a Read More toggle is shown in the component */
  fullBody?: string;
  attribution?: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: "1",
    src: "/images/terry-1.png",
    alt: "Terry Bell — a thoughtful close-up portrait in later years",
    caption: "A portrait of quiet strength",
  },
  {
    id: "2",
    src: "/images/terry-2.png",
    alt: "Terry Bell with children and colleagues during the exile years",
    caption: "In service during the exile years",
  },
  {
    id: "3",
    src: "/images/terry-3.png",
    alt: "Terry Bell listening intently at a public event",
    caption: "Always listening, always present",
  },
  {
    id: "4",
    src: "/images/terry-4.png",
    alt: "Terry Bell at the launch of A Hat, a Kayak and Dreams of Dar",
    caption: "Book launch — A Hat, a Kayak & Dreams of Dar",
  },
  {
    id: "5",
    src: "/images/terry-5.png",
    alt: "Terry Bell with friends and family in a garden gathering",
    caption: "Among friends",
  },
  {
    id: "6",
    src: "/images/terry-6.png",
    alt: "Terry Bell holding a Princeton University Grandpa mug",
    caption: "Grandpa",
  },
  {
    id: "7",
    src: "/images/terry-7.png",
    alt: "Terry Bell in a warm evening selfie with friends",
    caption: "Warmth and connection",
  },
  {
    id: "8",
    src: "/images/terry-8.png",
    alt: "Zapiro cartoon featuring Terry Bell — Daily Maverick, 2019",
    caption: "Zapiro, Daily Maverick — July 2019",
  },
  {
    id: "9",
    src: "/images/terry-9.png",
    alt: "Terry and Barbara Bell with close friends",
    caption: "Terry and Barbara with friends",
  },
  {
    id: "10",
    src: "/images/terry-10.png",
    alt: "Terry Bell at a warm family gathering around the table",
    caption: "Family and friends around the table",
  },
  {
    id: "11",
    src: "/images/terry-11.png",
    alt: "Terry Bell celebrating with a large group of friends",
    caption: "A life well celebrated",
  },
  {
    id: "12",
    src: "/images/terry-12.png",
    alt: "Terry and Barbara Bell with family in the garden",
    caption: "Terry and Barbara with family",
  },
  {
    id: "13",
    src: "/images/terry-13.png",
    alt: "Terry Bell with close friends and family in recent years",
    caption: "Among those he loved",
  },
  {
    id: "14",
    src: "/images/terry-14.png",
    alt: "Terry Bell — a close-up portrait in his later years, cap and glasses",
    caption: "A portrait of quiet strength",
  },
  {
    id: "15",
    src: "/images/terry-15.png",
    alt: "A younger Terry Bell, cap on, looking to the side",
    caption: "Terry Bell — younger years",
  },
  {
    id: "16",
    src: "/images/terry-16.png",
    alt: "Terry Bell with family beside a bus — children at the door",
    caption: "Family and adventure on the road",
  },
  {
    id: "17",
    src: "/images/terry-17.png",
    alt: "Terry Bell at a sumo wrestling demonstration",
    caption: "Terry — always game for anything",
  },
  {
    id: "18",
    src: "/images/terry-18.png",
    alt: "Terry and Barbara Bell with a large group of children outside a building",
    caption: "With children during the exile years",
  },
  {
    id: "19",
    src: "/images/terry-19.png",
    alt: "A young Terry Bell holding a rifle — historical archive photograph",
    caption: "Historical archive — early years",
  },
  {
    id: "20",
    src: "/images/terry-20.png",
    alt: "Young Terry and Barbara Bell holding their baby outdoors",
    caption: "Terry and Barbara with their first child",
  },
  {
    id: "21",
    src: "/images/terry-21.png",
    alt: "Terry and Barbara Bell paddling together in a canoe",
    caption: "On the water together",
  },
  {
    id: "22",
    src: "/images/terry-22.png",
    alt: "Terry and Barbara Bell with two young children beside a VW bus",
    caption: "Family on the road",
  },
  {
    id: "23",
    src: "/images/terry-23.png",
    alt: "Terry and Barbara Bell beside their canoe marked London to Dar-es-Salaam 1967",
    caption: "London to Dar-es-Salaam — 1967",
  },
  {
    id: "24",
    src: "/images/terry-24.png",
    alt: "Terry and Barbara Bell raising a glass by the river with a Danger River sign",
    caption: "Celebrating at the riverside",
  },
  {
    id: "25",
    src: "/images/terry-25.png",
    alt: "Terry and Barbara Bell in a tender portrait — she in a wide-brim hat",
    caption: "Terry and Barbara — early years",
  },
  {
    id: "26",
    src: "/images/terry-26.png",
    alt: "Terry and Barbara Bell waving from a canoe on the river",
    caption: "An adventurous life, lived together",
  },
  {
    id: "27",
    src: "/images/terry-27.png",
    alt: "Unfinished Business — book by Terry Bell in collaboration with Dumisa Buhle Ntsebeza",
    caption: "Unfinished Business — Terry Bell with Dumisa Buhle Ntsebeza",
  },
];

export const memoryCards: MemoryCard[] = [
  {
    id: "1",
    title: "Shared with love",
    body: "Stories, notes, and reflections can be placed here as a written archive of remembrance. Submit your memory using the Public Tributes section.",
    attribution: "The Bell Family",
  },
  {
    id: "2",
    title: "Archive in progress",
    body: "Personal memories, photographs, and written recollections are being gathered by the Bell family. This section will be updated as contributions are received from those who knew and loved Terry.",
    attribution: "The Bell Family",
  },
  {
    id: "3",
    title: "ANC extends condolences",
    // Preview shown by default — first paragraph of the ANC statement
    body: "\"The African National Congress mourns the passing of veteran anti-apartheid activist, journalist, and educator, Terry Bell, who passed away at the age of 84. We extend our heartfelt condolences to his family, friends, and comrades across South Africa and the international progressive movement. His passing marks the loss of a principled voice whose life was dedicated to the pursuit of justice, equality, and human dignity.\"",
    // Full statement shown when Read More is clicked
    fullBody: `"The African National Congress mourns the passing of veteran anti-apartheid activist, journalist, and educator, Terry Bell, who passed away at the age of 84. We extend our heartfelt condolences to his family, friends, and comrades across South Africa and the international progressive movement. His passing marks the loss of a principled voice whose life was dedicated to the pursuit of justice, equality, and human dignity.

Terry Bell belonged to a generation of activists who understood that the struggle against apartheid required courage, sacrifice, and international solidarity. From his early years as a journalist helping to establish the non-racial South African Journalists' Union, to his underground work on the publication Combat, and his detention under apartheid laws, Bell consistently placed himself on the frontlines of resistance. His years in exile, including his work in Zambia, the United Kingdom, and New Zealand, as well as his contribution to the development of education at SOMAFCO in Tanzania, reflect a life committed not only to opposing injustice but to building the foundations of a democratic future.

Throughout his life, Terry Bell remained an independent and critical thinker, guided by a deep commitment to workers, the marginalised, and the oppressed. Even where his political path diverged, his contribution to the broader liberation struggle and to public discourse in a democratic South Africa remained significant. His work as a journalist and commentator continued to challenge inequality, amplify the voices of working people, and promote progressive internationalism.

The ANC recognises and honours Terry Bell's role in the global anti-apartheid movement and his lifelong dedication to justice. His legacy reminds us that the struggle for a more equal and humane society did not end in 1994, but continues in new forms. May his life inspire future generations to remain steadfast in the pursuit of freedom, solidarity, and social justice."`,
    attribution: "African National Congress",
  },
];
