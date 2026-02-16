import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        Startseite
        <br />
        <Link href="/game">Zum Spiel</Link>
      </main>
    </div>
  );
}
