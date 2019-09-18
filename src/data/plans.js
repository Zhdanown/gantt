export const plans = [
  {
    id: "base-plan-1",
    name: "base-plan",
    status: { type: "new", name: "новый" },
    author: {},
    created: {},
    periods: [
      {
        id: "per-1",
        cluster: {
          id: "sfjsdfjdjlsdfjllsdf",
          name: "Kursk"
        },
        farm: {
          id: "bun",
          name: "Бунино"
        },
        culture: { id: "whteafalsdfj", name: "wheat" },
        agrooperation: { id: "bulkdfld-dfkd-dkdk", name: "Культивация" },
        dates: [
          { date: "22.08.19", prod: 56 },
          { date: "23.08.19", prod: 56 },
          { date: "24.08.19", prod: 56 },
          { date: "25.08.19", prod: 56 },
          { date: "26.08.19", prod: 56 },
          { date: "27.08.19", prod: 56 },
          { date: "28.08.19", prod: 56 },
          { date: "29.08.19", prod: 56 },
          { date: "30.08.19", prod: 56 },
          { date: "31.08.19", prod: 56 },
          { date: "01.09.19", prod: 56 },
          { date: "02.09.19", prod: 56 },
          { date: "03.09.19", prod: 56 },
          { date: "03.09.19", prod: 32 }
        ],
        machinery: [
          {
            vehicle: {
              id: "dkjfls-fdk234-dkdksl-kdkd1",
              name: "Трактор колесный Case IH Magnum 340"
            },
            workEquipment: {
              id: "dkdj-sdfkjdlsfsd-k33d783jd",
              name: "Борона пружинная сетчатая Hatzenbicher Striegel 24"
            }
            // productivity: 56
          }
        ]
      },
      {
        id: "per-2",
        cluster: { id: "sfjsdfjdjlsdfjllsdf", name: "Kursk" },
        farm: {
          id: "bun",
          name: "Бунино"
        },
        culture: { id: "ruyo34sldkj", name: "ruy" },
        agrooperation: { id: "bulkdfld-dfkd-dkdk", name: "Культивация" },
        dates: [
          { date: "03.09.19", prod: 50 },
          { date: "04.09.19", prod: 50 },
          { date: "05.09.19", prod: 60 },
          { date: "06.09.19", prod: 40 },
          { date: "07.09.19", prod: 0 },
          { date: "08.09.19", prod: 0 },
          { date: "09.09.19", prod: 0 }
        ],
        machinery: [
          {
            vehicle: {
              id: "dkjfls-fdk234-dkdksl-kdkd1",
              name: "Трактор колесный Case IH Magnum 340"
            },
            workEquipment: {
              id: "dkfj0342_k3ekdkd",
              name: "Борона дисковая тяжелая Wishek 842NT"
            }
            // productivity: 60
          },
          {
            vehicle: {
              id: "dkjfls-fdk234-dkdksl-kdkd1",
              name: "Трактор колесный Case IH Magnum 340"
            },
            workEquipment: {
              id: "dkdj-sdfkjdlsfsd-k33d783jd",
              name: "Борона пружинная сетчатая Hatzenbicher Striegel 24"
            }
            // productivity: 56
          }
        ]
      }
    ]
  }
];
