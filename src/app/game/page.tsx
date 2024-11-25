import Game from "@/components/Game";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <Navigation>
      <div className="min-h-screen">
        <Game />
      </div>
    </Navigation>
  );
}
