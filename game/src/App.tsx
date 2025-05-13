import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import confetti from "canvas-confetti";

export default function App() {
  const [numeroAdivinar] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [intento, setIntento] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [intentosTotales, setIntentosTotales] = useState(0);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);

  const comprobarIntento = () => {
    const num = parseInt(intento);
    if (isNaN(num) || num < 1 || num > 10) {
      setMensaje("⚠️ Introduce un número válido entre 1 y 10.");
      return;
    }

    setIntentosTotales((prev) => prev + 1);

    if (num < numeroAdivinar) {
      setMensaje("📉 El número es mayor.");
    } else if (num > numeroAdivinar) {
      setMensaje("📈 El número es menor.");
    } else {
      setMensaje(
        `🎉 ¡Correcto! Has acertado en ${intentosTotales + 1} intentos.`
      );
      setJuegoFinalizado(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    setIntento("");
  };

  const reiniciarJuego = () => {
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-md rounded-3xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-lg">
      <CardContent className="flex flex-col items-center gap-6 py-10 px-6">
        <h1 className="text-3xl font-extrabold text-indigo-600">
          🔢 Adivina el número
        </h1>
        <p className="text-gray-500 text-sm">Elige un número entre 1 y 10</p>

        {!juegoFinalizado && (
          <>
            <Input
              type="number"
              value={intento}
              onChange={(e) => setIntento(e.target.value)}
              placeholder="Introduce tu número"
              className="text-lg px-4 py-3 rounded-2xl"
            />

            <Button
              onClick={comprobarIntento}
              className="w-full text-lg px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-2xl"
            >
              Comprobar
            </Button>
          </>
        )}

        {mensaje && (
          <p
            className={`text-center text-lg font-medium ${
              mensaje.includes("Correcto")
                ? "text-green-600"
                : mensaje.includes("válido")
                ? "text-red-500"
                : "text-yellow-600"
            }`}
          >
            {mensaje}
          </p>
        )}

        {juegoFinalizado && (
          <Button
            variant="secondary"
            onClick={reiniciarJuego}
            className="w-full text-lg px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl"
          >
            🔄 Jugar otra vez
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
