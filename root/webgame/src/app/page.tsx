import Image from "next/image";

export default function Home() {
  const count = 100;
  return (
    <section className="flex justify-center items-center h-dvh">
      <section className="w-[50vw] aspect-square border! border-black">
        
        <div className="grid" style={{gridTemplateColumns : `repeat(${count},1fr)` }}>
          {
            Array(count).fill(null).map((_v,key1) => {
              return Array(count).fill(null).map((_v,key2) => {
                return <div key={`matrix-${key1}-${key2}`} className="w-full aspect-square border border-blue-300"></div>
              })
            })
          }
        </div>
      </section>

    </section>
  );
}
