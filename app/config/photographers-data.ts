export interface Photographer {
    id: number
    name: string
    specialty: string
    bio: string
    quote: string
    image: string
    works: {
        id: number
        title: string
        src: string
        aspect: "landscape" | "portrait" | "square"
    }[]
}

export const photographersData: Photographer[] = [
    {
        id: 1,
        name: "Mohit Kumar Majhi",
        specialty: "Smurf",
        bio: "Dadaji and Inter IIT Photography Captain",
        quote: "The landscape is a canvas where light and shadow tell eternal stories.",
        image: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768140969/mohitdp_cdo6bk.jpg",
        works: [
            {
                id: 1,
                title: "Mountain Vista",
                src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135375/DSC09647_1_ocd5fb.jpg",
                aspect: "landscape"
            },
            {
                id: 2,
                title: "Sunset Peaks",
                src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135371/IMG20230423075313_dpjo9x.jpg",
                aspect: "landscape"
            },
            {
                id: 3,
                title: "Alpine Meadow",
                src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135371/DSC01680_xa8ah5.jpg",
                aspect: "landscape"
            },
            {
                id: 5,
                title: "Alpine Meadow",
                src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135363/IMG_20250930_174359350_HDR_h9wbfi.jpg",
                aspect: "portrait"
            },
            {
                id: 4,
                title: "Alpine Meadow",
                src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135365/IMG20231119062911-01_d87ajb.jpg",
                aspect: "landscape"
            }

        ]
    },
    {
        id: 2,
        name: "Rahul Ranwa",
        specialty: "Smurf",
        bio: "Papaji and Inter IIT Filmmaking Captain",
        quote: "Every face tells a story; I am simply the storyteller.",
        image: "/fashion-photographer.jpg",
        works: [
            {
                id: 1,
                title: "Fashion Portrait",
                src: "/4.webp",
                aspect: "portrait"
            },
            {
                id: 2,
                title: "Urban Style",
                src: "/5.webp",
                aspect: "landscape"
            }
        ]
    },
    {
        id: 3,
        name: "Abhinav Bhardwaj",
        specialty: "Oompa Loompa",
        bio: "Kya matlab abhi maine socha nahi",
        quote: "The street is a canvas painted by humanity every single day.",
        image: "/street-photographer.jpg",
        works: [
            {
                id: 1,
                title: "City Life",
                src: "/6.webp",
                aspect: "landscape"
            },
            {
                id: 2,
                title: "Street Scene",
                src: "/7.webp",
                aspect: "portrait"
            }
        ]
    },
    {
        id: 4,
        name: "Pawan Manignandan",
        specialty: "Oompa Loompa",
        bio: "V-Log is better then S-Log",
        quote: "Love stories deserve to be told with beauty and authenticity.",
        image: "/wedding-photographer.jpg",
        works: [
            {
                id: 1,
                title: "Wedding Moment",
                src: "/8.webp",
                aspect: "landscape"
            }
        ]
    },
    {
        id: 5,
        name: "Musaib Bin Bashir",
        specialty: "Oompa Loompa",
        bio: "Bohat time lag gaye ye banane mai",
        quote: "Wildlife photography is a conversation between patience and wonder.",
        image: "/wildlife-photographer.jpg",
        works: [
            {
                id: 1,
                title: "Wildlife",
                src: "/1.webp",
                aspect: "landscape"
            }
        ]
    },
]
