import { useMemo } from "react";

export default function Home() {
  const now = new Date();

  const nama = [
    "Anggota - Sjakur",
    "Nurcwachid",
    "Tukawan",
    "H. Sukarni",
    "M. Taufan",
    "Ali Mahbubi",
    "H. Syaiful",
    "Ichawani",
    "Maghfur",
    "Muzayin",
    "Arik",
    "Khusnul",
    "Muhaimin",
    "H.Sukemi",
    "Muh. Roni",
    "Safiq",
    "Sukamto",
    "Achamad",
    "H. Karsono",
    "Anas",
    "M. Khoirul Umam",
    "Imam Mukarom",
    "H. Yusuf",
    "Zainudin",
    "Isman Hadi",
    "Abdus Sjakur",
    "Ghofur",
    "Muhammad",
    "Wahib",
    "H. Sutikadiono",
  ];

  const juz = Array.from({ length: 30 }, (_, i) => i + 1);

  const weekNumber = useMemo(() => {
    const startDate = new Date("2026-05-31");
    const diffTime = now - startDate;
    return Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
  }, []);

  const dataKhataman = nama.map((item, index) => ({
    nama: item,
    juz: juz[(index + weekNumber) % juz.length],
  }));

  const formatTanggal = (date) => {
    const hari = String(date.getDate()).padStart(2, "0");
    const bulan = String(date.getMonth() + 1).padStart(2, "0");
    const tahun = date.getFullYear();

    return `${hari}-${bulan}-${tahun}`;
  };

  const nextMalamMinggu = () => {
    const next = new Date(now);

    let hariIni = now.getDay();
    let selisih = (6 - hariIni + 7) % 7;

    if (selisih === 0 && now.getHours() >= 18) {
      selisih = 7;
    }

    next.setDate(now.getDate() + selisih);
    next.setHours(18, 0, 0, 0);

    return formatTanggal(next);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center font-bold text-xl mt-4">Khataman</div>
      
      <div className="flex flex-col p-4">
        <div className="flex">
          <div className="flex-1">Hari ini</div>
          <div className="flex-1">: {formatTanggal(now)}</div>
        </div>

        <div className="flex">
          <div className="flex-1">Khataman Berikutnya</div>
          <div className="flex-1">: {nextMalamMinggu()}</div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[50px_1fr_60px] font-bold">
          <div className="border p-2 text-center">No</div>
          <div className="border p-2 text-center">Nama</div>
          <div className="border p-2 text-center">Juz</div>
        </div>

        {dataKhataman.map((item, index) => (
          <div className="grid grid-cols-[50px_1fr_60px]">
            <div className="border p-2 text-center">{index + 1}</div>

            <div className="border p-2">{item.nama}</div>

            <div className="border p-2 text-center">{item.juz}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
