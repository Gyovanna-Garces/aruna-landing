"use client";

import { useState } from "react";
import styles from "./Reservation.module.css";

const tables = [
  { number: 1, x: 15, y: 45 },
  { number: 2, x: 32, y: 45 },
  { number: 3, x: 15, y: 56 },
  { number: 4, x: 32, y: 56 },
  { number: 5, x: 15, y: 67 },
  { number: 6, x: 32, y: 67 },
  { number: 7, x: 24, y: 73, round: true },
  { number: 8, x: 41, y: 63 },
  { number: 9, x: 51, y: 59, round: true },
  { number: 10, x: 51, y: 71, round: true },
  { number: 11, x: 68, y: 45, round: true },
  { number: 12, x: 68, y: 58, round: true },
  { number: 13, x: 27, y: 83 },
  { number: 14, x: 45, y: 83 },
  { number: 15, x: 55, y: 83 },
  { number: 16, x: 63, y: 83 },
  { number: 17, x: 12, y: 83 },
];

const takenTables = new Set([3, 11]);

export function Reservation() {
  const [view, setView] = useState<"2d" | "3d">("2d");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  function handleSelectTable(number: number) {
    if (takenTables.has(number)) return;
    setSelectedTable(number);
  }

  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>

        <header className={styles.intro}>
          <span className={styles.eyebrow}>Reservas</span>

          <h1>Reserve sua mesa</h1>

          <p>
            Escolha a data, o horário e o número de pessoas.
            Depois, selecione sua mesa diretamente na planta do Aruna.
          </p>
        </header>

        <div className={styles.layout}>

          <section className={styles.panel}>
            <h2>Seus dados</h2>

            <form className={styles.form}>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="nome">Nome</label>
                  <input id="nome" type="text" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="sobrenome">Sobrenome</label>
                  <input id="sobrenome" type="text" />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="ex: meunome@exemplo.com"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="telefone">Telefone</label>
                <input id="telefone" type="tel" />
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="data">Data</label>
                  <input id="data" type="date" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="hora">Horário</label>
                  <input id="hora" type="time" />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="pessoas">
                  Número de pessoas
                </label>

                <input
                  id="pessoas"
                  type="number"
                  min="1"
                  max="20"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="tipo">Tipo de reserva</label>

                <select id="tipo">
                  <option>Salão interno</option>
                  <option>Deck externo</option>
                  <option>Bar</option>
                  <option>Ocasião especial</option>
                  <option>Outro</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="pedidos">
                  Pedidos especiais
                </label>

                <textarea
                  id="pedidos"
                  placeholder="Alergias, aniversário, preferências..."
                />
              </div>

            </form>
          </section>

          <section className={styles.panel}>
            <h2>Escolha sua mesa</h2>

            <div className={styles.viewToggle}>
              <button
                type="button"
                className={view === "2d" ? styles.active : ""}
                onClick={() => setView("2d")}
              >
                Ver planta 2D
              </button>

              <button
                type="button"
                className={view === "3d" ? styles.active : ""}
                onClick={() => setView("3d")}
              >
                Ver em 3D
              </button>
            </div>

            {view === "2d" ? (
              <div className={styles.planStage}>
                <img
                  src="/planta-aruna.jpg"
                  alt="Planta do restaurante Aruna"
                />

                {tables.map((table) => (
                  <button
                    key={table.number}
                    type="button"
                    className={`
                      ${styles.marker}
                      ${table.round ? styles.round : ""}
                      ${selectedTable === table.number ? styles.selected : ""}
                      ${takenTables.has(table.number) ? styles.taken : ""}
                    `}
                    style={{
                      left: `${table.x}%`,
                      top: `${table.y}%`,
                    }}
                    disabled={takenTables.has(table.number)}
                    onClick={() => handleSelectTable(table.number)}
                    aria-label={`Mesa ${table.number}`}
                  >
                    {table.number}
                  </button>
                ))}
              </div>
            ) : (
              <div className={styles.stage3d}>
                <p>Visualização 3D da mesa selecionada</p>
              </div>
            )}

            <div className={styles.legend}>
              <span>
                <i className={`${styles.dot} ${styles.free}`} />
                Disponível
              </span>

              <span>
                <i className={`${styles.dot} ${styles.selectedDot}`} />
                Selecionada
              </span>

              <span>
                <i className={`${styles.dot} ${styles.takenDot}`} />
                Ocupada
              </span>
            </div>

            <div className={styles.selectionBar}>
              <span>
                Mesa selecionada:{" "}
                <strong>
                  {selectedTable
                    ? `Mesa ${selectedTable}`
                    : "nenhuma"}
                </strong>
              </span>

              <button
                type="button"
                className={styles.primaryButton}
                disabled={!selectedTable}
              >
                Confirmar reserva
              </button>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}