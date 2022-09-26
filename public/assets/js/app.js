class App {
  constructor() {
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driver = document.getElementById("driver");
    this.date = document.getElementById("date");
    this.time = document.getElementById("time");
    this.capacity = document.getElementById("capacity");
  }

  async init() {
    await this.load();

    // Register click listener
    this.loadButton.onclick = this.run;
  }

  run = async () => {
    console.log(this.driver.value);
    this.clear();

    const inputDate = this.date.value;
    const inputTime = this.time.value;
    const zonaWaktu = "+0700";
    const [tahun, bulan, tanggal] = inputDate.split("-");
    const jam = inputTime;
    const formatWaktu = `${tahun}-${bulan}-${tanggal}T${jam}:00:00${zonaWaktu}`;
    const carAvailableInput = new Date(formatWaktu);

    if(this.driver.value == "Pilih Tipe Driver") {
      alert('tolong pilih driver dengan benar');
      return;
    }
    if(this.time.value == "Pilih Waktu") {
      alert('tolong pilih waktun dengan benar');
      return;
    }
    if(carAvailableInput < new Date()) {
      alert('tolong pilih tanggal lebih dari hari ini');
      return;
    }
    if ((this.capacity.value < 0 || this.capacity.value > 6) && this.capacity.value !== "") {
      alert('tolong isi jumlah penumpang dengan benar');
      return;
    }
    await this.load();
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const cars = await Binar.listCars(car => {
      let IsValid = true;
      if (car.available === false) IsValid = false;
      const inputCapacity = this.capacity.value;
      if (inputCapacity !== "" && car.capacity < inputCapacity) IsValid = false;

      const carAvailable = new Date(car.availableAt);
      const inputDate = this.date.value;
      const inputTime = this.time.value;
      const zonaWaktu = "+0700";
      const [tahun, bulan, tanggal] = inputDate.split("-");
      const jam = inputTime;
      const formatWaktu = `${tahun}-${bulan}-${tanggal}T${jam}:00:00${zonaWaktu}`;
      const carAvailableInput = new Date(formatWaktu);

      if(carAvailableInput < carAvailable) IsValid = false;


      return IsValid;
    });
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
