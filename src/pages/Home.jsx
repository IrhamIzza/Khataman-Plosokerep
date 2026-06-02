import { useMemo, useState, useRef } from "react";
import foto1 from "../assets/a.jpg";
import foto2 from "../assets/b.jpg";
import foto3 from "../assets/c.jpg";
import { toPng } from "html-to-image";

export default function Home() {
  const [tempat, setTempat] = useState(
    "Bpk. Anas Dhofir Jln. Ploso No.... RT.02 RW.02 Kota Blitar",
  );

  const now = new Date();

  const nama = [
    "Anggota - Sjakur",
    "H. Sutikadiono",
    "Wahib",
    "H. Muhammad ",
    "Heru Abd Ghofur",
    "H. Abdus Sjakur",
    "H. Isman Hadi",
    "Zainudin",
    "H. Yusuf",
    "Imam Mukarom",
    "M. Khoirul Umam",
    "Anas Dhofir",
    "H. Karsono",
    "Achamad",
    "K. Sukamto",
    "K. Syafiq",
    "Muh. Roni",
    "H.Sukemi",
    "Muhaimin",
    "Khusnul",
    "Arik",
    "Muzayin",
    "Maghfur",
    "Ichawani",
    "H. Syaiful",
    "Ali Mahbubi",
    "M. Taufan",
    "H. Sukarni",
    "Tukawan",
    "Nurcwachid",
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
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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

  const nextMalamMinggu2 = () => {
    const next = new Date(now);

    let hariIni = now.getDay();
    let selisih = (6 - hariIni + 7) % 7;

    if (selisih === 0 && now.getHours() >= 18) {
      selisih = 7;
    }

    // +14 hari (2 minggu setelah malam minggu pertama)
    next.setDate(now.getDate() + selisih + 14);
    next.setHours(18, 0, 0, 0);

    return formatTanggal(next);
  };

  const divRef = useRef(null);

  const downloadImage = async () => {
    if (!divRef.current) return;

    const dataUrl = await toPng(divRef.current, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = "undangan-khataman.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="container mx-auto">
      <div className="mb-2 p-4">
        <label htmlFor="tempat" className="block mb-1 font-medium">
          Tempat Khataman
        </label>

        <textarea
          id="tempat"
          value={tempat}
          onChange={(e) => setTempat(e.target.value)}
          rows={2}
          className="w-full border p-2"
        />
      </div>

      <div ref={divRef} className="bg-white p-4">
        <div className="flex p-4 ">
          <div className="flex flex-col mx-auto">
            <img src={foto1} alt="logo" className="mx-auto w-22 h-22" />
            <img src={foto2} alt="logo" className="mx-auto h-30" />

            <div className="text-lg">
              <p>
                Ngaturi pirso dumateng sedoyo anggota Jam’iyah Khotmil Qur’an,
                bilih mbenjing dinten{" "}
                <span className="font-bold text-blue-800 underline">
                  Sabtu malem Ahad tgl 06 Juni 2026, ba'dah Maghrib
                </span>{" "}
                awal wonten dalem ipun{" "}
                <span className="font-bold text-blue-800 underline whitespace-pre-line">
                  {tempat}
                </span>
                .
              </p>
              <p>Makaten saking kulo, matur nuwun🙏. </p>
            </div>

            <img src={foto3} alt="logo" className="h-26" />
            <div className="text-lg text-right">
              <p className="mr-5">TTD</p>
              <div className="h-10"></div>
              <p>Pengurus</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={downloadImage}
          className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
        >
          Download Gambar
        </button>
      </div>

      <div className="text-center font-bold text-xl mt-4">
        Daftar Juz Khataman
      </div>

      <div className="flex flex-col p-4">
        <div className="flex">
          <div className="flex-1">Khataman Hari ini</div>
          <div className="flex-1">: {nextMalamMinggu()}</div>
        </div>

        {/* <div className="flex">
          <div className="flex-1">Khataman Berikutnya</div>
          <div className="flex-1">: {nextMalamMinggu2()}</div>
        </div> */}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[50px_1fr_60px] font-bold">
          <div className="border p-2 text-center">No</div>
          <div className="border p-2 text-center">Nama</div>
          <div className="border p-2 text-center">Juz</div>
        </div>

        {dataKhataman.map((item, index) => (
          <div key={index} className="grid grid-cols-[50px_1fr_60px]">
            <div className="border p-2 text-center">{index + 1}</div>

            <div className="border p-2">{item.nama}</div>

            <div className="border p-2 text-center">{item.juz}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
