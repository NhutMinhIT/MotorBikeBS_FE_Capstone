import { IMotorbike } from "../Motorbike-components/model/Motorbike";

const items: IMotorbike[] = [
  {
    id: 1,
    image:
      "https://xevespa.vn/wp-content/uploads/2022/04/honda-vario-2017-2.jpg",
    images: [
      "https://cdn.xehoiviet.com/images/car/cropthumb/1200x752/2020/03/10/0832662233/vario-150-mau-cu-2o18-den-nham-mam-dong-bstp-9-chu-2ke038j7fae.jpg",
      "https://sb.nhattao.com/2018/12/11677460_D699A5EF-1D85-446E-9DD9-0ED8DF23F02F.jpeg",
    ],
    name: "Xe Honda Vario",
    brand: "Honda",
    model: "Vario 150cc",
    vehicleCapacity: 150,
    price: 20000000,
    status: "Đã sử dụng",
    storeName: "Lê Vũ Store",
    yearRegister: new Date("2017-01-31"),
    postDate: new Date("2023-09-05"),
    motorType: "Tay Ga",
    odo: 30000,
    description:
      "Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ",
  },
  {
    id: 2,
    image:
      "https://cdn-img.thethao247.vn/storage/files/linhseo/2022/11/23/gia-xe-air-blade-cu-cap-nhat-moi-nhat-2022-221662.jpg",
    images: [],
    name: "Xe Honda Air Blade",
    brand: "Honda",
    model: "Air Blade 150cc",
    vehicleCapacity: 150,
    price: 35000000,
    status: "Đã sử dụng",
    storeName: "Lê Vũ Store",
    yearRegister: new Date("2022-05-25"),
    postDate: new Date("2023-09-05"),
    motorType: "Tay Ga",
    odo: 26000,
    description:
      "Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ",
  },
  {
    id: 3,
    image:
      "https://autobikes.vn/stores/photo_data/huutho/102016/17/14/144608_Honda-Wave-RSX-2017-22.jpg",
    images: [],
    name: "Xe Wave RSX",
    brand: "Honda",
    model: "Wave RSX 110cc",
    vehicleCapacity: 110,
    price: 5000000,
    status: "Đã sử dụng",
    storeName: "Lê Vũ Store",
    yearRegister: new Date("2016-01-31"),
    postDate: new Date("2023-09-05"),
    motorType: "Xe Số",
    odo: 80000,
    description:
      "Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ, Biển số thành phố, sang tên nhanh chống",
  },
  {
    id: 4,
    image:
      "https://litteritcostsyou.org/wp-content/uploads/2020/09/gia-xe-sirius.jpg",
    images: [],
    name: "Xe Sirus",
    brand: "Yamaha",
    model: "Yamaha Sirus 110cc",
    vehicleCapacity: 110,
    price: 8000000,
    status: "Đã sử dụng",
    storeName: "Lê Vũ Store",
    yearRegister: new Date("2019-08-31"),
    postDate: new Date("2023-09-05"),
    motorType: "Xe số ",
    odo: 50000,
    description:
      "Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ",
  },
];

export default items;