const imageUrl = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=82`;

const catalogByDepartment = [
    {
        department: 'Men',
        items: [
            {
                category: 'Hoodies',
                name: 'Fleece Hoodie',
                price: 3500,
                imageIds: [
                    'photo-1611817757591-c3f345024273',
                    'photo-1688111421205-a0a85415b224',
                    'photo-1685328403732-64be6bb9d112',
                    'photo-1632682582909-2b3a2581eef7',
                    'photo-1564557287817-3785e38ec1f5',
                ],
            },
            {
                category: 'T-Shirts',
                name: 'Cotton T-Shirt',
                price: 1800,
                imageIds: [
                    'photo-1678872844677-d650b788709b',
                    'photo-1593726891090-b4c6bc09c819',
                    'photo-1625728273603-0404614abb7e',
                    'photo-1628737490381-117c818d1ad7',
                    'photo-1503341338985-c0477be52513',
                ],
            },
            {
                category: 'Shirts',
                name: 'Button-Down Shirt',
                price: 2800,
                imageIds: [
                    'photo-1740711152088-88a009e877bb',
                    'photo-1621072156002-e2fccdc0b176',
                    'photo-1624835567150-0c530a20d8cc',
                    'photo-1627686011747-74adda3d2343',
                    'photo-1618786177957-29d9b6b26d8a',
                ],
            },
            {
                category: 'Sweatpants',
                name: 'Relaxed Sweatpants',
                price: 3200,
                imageIds: [
                    'photo-1789110519605-c5ceeeab5a0f',
                    'photo-1580906853203-f493cea9ff28',
                    'photo-1518292309104-b0ee1cfba4cc',
                    'photo-1518292115891-dd76755ab1cf',
                    'photo-1559962493-86e9d4fc7fee',
                ],
            },
            {
                category: 'Pajamas',
                name: 'Cotton Pajama Set',
                price: 4000,
                imageIds: [
                    'photo-1746527972243-7c2516ec352f',
                    'photo-1759229874865-20a8c780c86b',
                    'photo-1612975828131-845f5bdb8676',
                    'photo-1713428856162-b2ea2e6d91a6',
                    'photo-1713428856240-100df77350bc',
                ],
            },
            {
                category: 'Hats',
                name: 'Logo Baseball Cap',
                price: 1500,
                imageIds: [
                    'photo-1521369909029-2afed882baee',
                    'photo-1531891570158-e71b35a485bc',
                    'photo-1542529727-24cb357c57d2',
                    'photo-1568246621541-5704b4f0bbf2',
                    'photo-1648114359508-8596f8f2f3fc',
                ],
            },
            {
                category: '2-Piece Sets',
                name: 'Matching Track Set',
                price: 6500,
                imageIds: [
                    'photo-1602670935908-094f41dcb67c',
                    'photo-1643622744071-6aa7644a0ffd',
                    'photo-1541102396743-74c128e1133e',
                    'photo-1656664317720-e9d245741879',
                    'photo-1632053219083-02539aeb98a3',
                ],
                galleryIds: [
                    'photo-1649565899044-4f606fd66903',
                    'photo-1711500310961-d9a9b6430f26',
                    'photo-1659817526829-1c570ea3b947',
                    'photo-1664877305562-7c625c507252',
                    'photo-1654535272925-5727e39da30a',
                ],
            },
            {
                category: 'Workout Wear',
                name: 'Training Set',
                price: 5200,
                imageIds: [
                    'photo-1608217002058-2e45c33b6c2c',
                    'photo-1747027887263-8974b74ded25',
                    'photo-1619361814016-4acc36025fa9',
                    'photo-1646072507419-9f836f8d3f67',
                    'photo-1643061779987-78b366128372',
                ],
            },
            {
                category: 'Shoes',
                name: 'Everyday Sneakers',
                price: 6800,
                imageIds: [
                    'photo-1560769629-975ec94e6a86',
                    'photo-1595341888016-a392ef81b7de',
                    'photo-1603808033192-082d6919d3e1',
                    'photo-1587563871167-1ee9c731aefb',
                    'photo-1600054904350-1d493ae5f922',
                ],
            },
            {
                category: '3-Piece Suits',
                name: 'Tailored Three-Piece Suit',
                prices: [10000, 45000, 120000, 220000, 300000],
                imageIds: [
                    'photo-1631052066165-9720608b36da',
                    'photo-1594938298603-c8148c4dae35',
                    'photo-1679101893310-9b9adb4b733b',
                    'photo-1594938328870-9623159c8c99',
                    'photo-1679101893304-045625840a94',
                ],
            },
            {
                category: 'Formal Shoes',
                name: 'Leather Dress Shoes',
                price: 8500,
                imageIds: [
                    'photo-1668069226492-508742b03147',
                    'photo-1614252235316-8c857d38b5f4',
                    'photo-1641893843833-a006778dc00b',
                    'photo-1603191659812-ee978eeeef76',
                    'photo-1625357165350-bdbcb6d7d524',
                ],
            },
            {
                category: '3-Piece Suits',
                name: 'Evening Three-Piece Suit',
                prices: [15000, 65000, 180000, 260000],
                imageIds: [
                    'photo-1609840170480-4c440bcd5d8f',
                    'photo-1712773663106-bcad3c446544',
                    'photo-1675383094481-3e2088da943b',
                    'photo-1480429370139-e0132c086e2a',
                ],
            },
        ],
    },
    {
        department: 'Women',
        items: [
            {
                category: 'Hoodies',
                name: 'Fleece Hoodie',
                price: 3500,
                imageIds: [
                    'photo-1516195851888-6f1a981a862e',
                    'photo-1578470507807-3fc541d5f544',
                    'photo-1785354986088-acd3f3147a6c',
                    'photo-1674695662162-cc9cdf494e88',
                    'photo-1542642810-ff5ac8ce5669',
                ],
            },
            {
                category: 'T-Shirts',
                name: 'Cotton T-Shirt',
                price: 1800,
                imageIds: [
                    'photo-1759572095384-1a7e646d0d4f',
                    'photo-1620799139507-2a76f79a2f4d',
                    'photo-1618677603286-0ec56cb6e1b5',
                    'photo-1620799139652-715e4d5b232d',
                    'photo-1503342217505-b0a15ec3261c',
                ],
            },
            {
                category: 'Shirts & Blouses',
                name: 'Relaxed Blouse',
                price: 2800,
                imageIds: [
                    'photo-1761117228880-df2425bd70da',
                    'photo-1764337593519-c51a77b4fc3d',
                    'photo-1789110521592-044c58391f7f',
                    'photo-1765365353704-ed0b6e1b11c2',
                    'photo-1770294758906-c8762abb2c8b',
                ],
            },
            {
                category: 'Pajamas',
                name: 'Soft Pajama Set',
                price: 4200,
                imageIds: [
                    'photo-1766056278842-b754f1e093c0',
                    'photo-1766056278944-ca0e4f49e61f',
                    'photo-1766056278967-c0646b1bfd67',
                    'photo-1766056278825-55168658f120',
                    'photo-1768696083097-600943ad9d05',
                ],
            },
            {
                category: 'Flared 2-Piece Sets',
                name: 'Flared Pants Co-ord Set',
                price: 6800,
                imageIds: [
                    'photo-1649107980733-fb9d9153d7a7',
                    'photo-1643618410229-450aac7615c8',
                    'photo-1701318227054-daa5d60a38fb',
                    'photo-1779153617249-c1f0d10de485',
                    'photo-1684214553643-71d8d6234e09',
                ],
                galleryIds: [
                    'photo-1763818103448-8edffd43c252',
                    'photo-1765436607935-aa8e3aef08f4',
                    'photo-1765436607860-31ad5416d88d',
                    'photo-1763971922553-c9f37d1fe06f',
                    'photo-1765269304162-6d58bc582269',
                ],
            },
            {
                category: 'Workout Wear',
                name: 'Performance Leggings Set',
                price: 5500,
                imageIds: [
                    'photo-1645318800735-737d3a422de6',
                    'photo-1623746884939-c9f1701574a9',
                    'photo-1789111161024-14711920a5b0',
                    'photo-1768929096297-ba9fde63f58f',
                    'photo-1606902965551-dce093cda6e7',
                ],
            },
            {
                category: 'Sweatpants',
                name: 'Relaxed Sweatpants',
                price: 3200,
                imageIds: [
                    'photo-1515886657613-9f3515b0c78f',
                    'photo-1777833186518-a46420263988',
                    'photo-1789110854262-ec66f0648ec7',
                    'photo-1685464583529-7f527c50e22f',
                ],
            },
            {
                category: 'Dresses',
                name: 'Everyday Dress',
                price: 4800,
                imageIds: [
                    'photo-1496747611176-843222e1e57c',
                    'photo-1789110853872-f416085557fa',
                    'photo-1789110520302-3df8ce0410f0',
                    'photo-1789110519342-6d3f6b07a749',
                ],
            },
            {
                category: 'Dresses & Rompers',
                name: 'Printed Dress',
                price: 5200,
                imageIds: [
                    'photo-1789110520185-e1a6a694b795',
                    'photo-1789110854094-ed530516a6d1',
                    'photo-1789110853833-bc1a883da2d6',
                    'photo-1789110520192-5ee95db61401',
                    'photo-1619794724492-651397287d94',
                ],
            },
            {
                category: 'Boots',
                name: 'Fashion Boots',
                price: 8200,
                imageIds: [
                    'photo-1605733513549-de9b150bd70d',
                    'photo-1573688886816-d0072f2b8b77',
                    'photo-1519415943484-9fa1873496d4',
                    'photo-1608666634759-4376010f863d',
                    'photo-1619253341026-74c609e6ce50',
                ],
            },
            {
                category: 'Shoes',
                name: 'Everyday Sneakers',
                price: 7200,
                imageIds: [
                    'photo-1608667508764-33cf0726b13a',
                    'photo-1605408499391-6368c628ef42',
                    'photo-1621996659490-3275b4d0d951',
                    'photo-1575425939273-46ecee6d6931',
                ],
            },
            {
                category: 'Handbags',
                name: 'Everyday Shoulder Bag',
                price: 3900,
                imageIds: [
                    'photo-1705909237050-7a7625b47fac',
                    'photo-1559563458-527698bf5295',
                    'photo-1594223274512-ad4803739b7c',
                    'photo-1652427019217-3ded1a356f10',
                ],
            },
            {
                category: 'Makeup Tools',
                name: 'Beauty Brush Set',
                price: 1800,
                imageIds: [
                    'photo-1678695692040-e9a39502c357',
                    'photo-1500840216050-6ffa99d75160',
                    'photo-1678695232855-19883ebbe9a9',
                    'photo-1678695407715-4b13699b5052',
                ],
            },
        ],
    },
    {
        department: 'Accessories',
        items: [
            {
                category: 'Glasses',
                name: 'Frame Glasses',
                price: 2400,
                imageIds: [
                    'photo-1611222777277-61319d63ca94',
                    'photo-1508296695146-257a814070b4',
                    'photo-1559070081-648fb00b2ed1',
                    'photo-1611824204322-24963b44d68b',
                    'photo-1612902457652-33aff0a641fa',
                ],
            },
            {
                category: 'Sunglasses',
                name: 'Fashion Sunglasses',
                price: 2800,
                imageIds: [
                    'photo-1635631414456-6a9dc5051a3d',
                    'photo-1635500574974-114cb4f49759',
                    'photo-1623832101940-647285e32a58',
                    'photo-1511499767150-a48a237f0083',
                    'photo-1574258495973-f010dfbb5371',
                ],
            },
            {
                category: 'Watches',
                name: 'Everyday Watch',
                price: 6500,
                imageIds: [
                    'photo-1524592094714-0f0654e20314',
                    'photo-1506193095-80bc749473f2',
                    'photo-1584208123923-cc027813cbcb',
                    'photo-1590995505834-e5380bba1865',
                    'photo-1662333084914-3eea84762671',
                ],
            },
            {
                category: 'Makeup Tools',
                name: 'Professional Makeup Brush',
                price: 1800,
                imageIds: [
                    'photo-1713244528167-bdf4901cd240',
                    'photo-1678695468927-638ee59432f5',
                    'photo-1637834700149-23d782334f8e',
                    'photo-1678695521719-0225e51632bc',
                    'photo-1596462502278-27bfdc403348',
                ],
            },
            {
                category: 'Bags',
                name: 'Everyday Crossbody Bag',
                price: 4200,
                imageIds: [
                    'photo-1492707892479-7bc8d5a4ee93',
                    'photo-1640901555383-7335ec5a6476',
                    'photo-1560891958-68bb1fe7fb78',
                    'photo-1548036328-c9fa89d128fa',
                    'photo-1584917865442-de89df76afd3',
                ],
            },
            {
                category: 'Belts',
                name: 'Classic Leather Belt',
                price: 1900,
                imageIds: [
                    'photo-1624222247344-550fb60583dc',
                    'photo-1705493655920-20c572928501',
                    'photo-1752386341161-de2b02ea1f50',
                    'photo-1752386268324-0533ffbfbc0e',
                    'photo-1549654929-e63d34779e41',
                ],
            },
            {
                category: 'Jewelry',
                name: 'Minimal Jewelry Set',
                price: 2500,
                imageIds: [
                    'photo-1722410180687-b05b50922362',
                    'photo-1655255114527-d0a834d9a774',
                    'photo-1606760227091-3dd870d97f1d',
                    'photo-1744822220368-c380740bfc7f',
                    'photo-1744369382892-eb5b6a2fdc6f',
                ],
            },
            {
                category: 'Earrings',
                name: 'Statement Earrings',
                price: 2100,
                imageIds: [
                    'photo-1722410180670-b6d5a2e704fa',
                    'photo-1694062045776-f48d9b6de57e',
                    'photo-1722410180681-9f5a22d7ebb6',
                    'photo-1611652022419-a9419f74343d',
                    'photo-1515562141207-7a88fb7ce338',
                ],
            },
            {
                category: 'Hats',
                name: 'Fashion Hat',
                price: 1600,
                imageIds: [
                    'photo-1617922001439-4a2e6562f328',
                    'photo-1593476087123-36d1de271f08',
                    'photo-1643616955173-1c5af154060e',
                    'photo-1711467714592-56781075e928',
                    'photo-1584091339971-b94eb62b833e',
                ],
            },
            {
                category: 'Scarves',
                name: 'Soft Woven Scarf',
                price: 1800,
                imageIds: [
                    'photo-1693382288218-2ce85aa26974',
                    'photo-1609803384069-19f3e5a70e75',
                    'photo-1609803364911-9e275e5a2b44',
                    'photo-1760551601203-12eddfb62216',
                    'photo-1788506713070-664c8dbe6705',
                ],
            },
            {
                category: 'Wallets',
                name: 'Leather Wallet',
                price: 2200,
                imageIds: [
                    'photo-1579014134953-1580d7f123f3',
                    'photo-1614330316567-11d8e572db16',
                    'photo-1624538000860-24716b9050f2',
                    'photo-1614330315526-166f2d71e544',
                    'photo-1620109176813-e91290f6c795',
                ],
            },
            {
                category: 'Hair Accessories',
                name: 'Hair Styling Set',
                price: 1300,
                imageIds: [
                    'photo-1791714762214-9d4af2d99caa',
                    'photo-1774301844178-c9ce96b76d92',
                    'photo-1791714762207-09d9720186ab',
                    'photo-1788079962199-485109cc9cd0',
                    'photo-1789856469077-ead8f3c255e2',
                ],
            },
            {
                category: 'Makeup',
                name: 'Cosmetics Set',
                price: 3200,
                searchTerms: ['make up', 'beauty', 'lipstick', 'foundation', 'eyeshadow'],
                imageIds: [
                    'photo-1780838039970-004da92278a4',
                    'photo-1780838039819-c2b226cf0941',
                    'photo-1701271482230-5ecaec3cd3e1',
                    'photo-1783017277390-1549847908db',
                    'photo-1767360963892-3353defd6584',
                ],
            },
            {
                category: 'Nail Sets',
                name: 'Press-On Nail Set',
                price: 2200,
                searchTerms: ['nails', 'press on nails', 'manicure', 'nail art'],
                imageIds: [
                    'photo-1719494206679-24a205905578',
                    'photo-1587393794661-ef05657e10b9',
                    'photo-1610992015762-45dca7fa3a85',
                    'photo-1519014816548-bf5fe059798b',
                    'photo-1522337660859-02fbefca4702',
                ],
            },
            {
                category: 'Lashes',
                name: 'False Lash Set',
                price: 1800,
                searchTerms: ['eyelashes', 'false eyelashes', 'lash extensions'],
                imageIds: [
                    'photo-1770999086860-143f54adf01b',
                    'photo-1639629509821-c54cdd984227',
                    'photo-1683719312734-e31de63957ab',
                    'photo-1528047128849-2382ff646073',
                    'photo-1595550912256-b24059bb08e8',
                ],
            },
            {
                category: 'Wigs',
                name: 'Fashion Wig',
                prices: [5000, 6250, 7500, 8750, 10000],
                searchTerms: ['hair', 'hair extensions', 'lace front wig'],
                imageIds: [
                    'photo-1787220674717-5f44f30d1ae1',
                    'photo-1515172371186-85d50c9f1fc1',
                    'photo-1633686120492-c52f9665a2a6',
                    'photo-1754327748419-715068469357',
                    'photo-1570570525340-cc356a1383fb',
                ],
            },
        ],
    },
];

const productStyles = ['Classic', 'Signature', 'Everyday', 'Modern', 'Premium'];

const products = catalogByDepartment.flatMap(({ department, items }) =>
    items.flatMap(item => item.imageIds.map((id, index) => {
        const image = {
            src: imageUrl(id),
            alt: `${department} ${item.name} fashion photograph`,
        };
        const galleryImageId = item.galleryIds?.[index];
        const images = galleryImageId
            ? [
                image,
                {
                    src: imageUrl(galleryImageId),
                    alt: `${department} ${item.name} alternate view`,
                },
            ]
            : [image];

        return {
            id: `${department.toLowerCase()}-${item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}`,
            name: `${productStyles[index % productStyles.length]} ${item.name}`,
            price: item.prices ? item.prices[index] : item.price,
            image: image.src,
            images,
            category: item.category,
            department,
            brand: 'LEEWEAR',
            searchTerms: item.searchTerms || [],
        };
    })),
);
