import Game from "@/components/Game";
import Navigation from "@/components/Navigation"

export default function Home() {
  return (
    <Navigation>
    <div className=" items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Game />
    </div>
    </Navigation>
  );
}
