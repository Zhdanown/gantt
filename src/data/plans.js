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
          { date: "22.08.19" },
          { date: "23.08.19" },
          { date: "24.08.19" }
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
          { date: "03.09.19" },
          { date: "04.09.19" },
          { date: "05.09.19" },
          { date: "06.09.19" }
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
          }
        ]
      }
    ]
  }
];
