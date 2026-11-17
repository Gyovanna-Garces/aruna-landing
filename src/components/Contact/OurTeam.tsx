import Image from "next/image";
import styles from "./OurTeam.module.css";

const teamMembers = [
  {
    id: 1,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_1.jpg",
  },
  {
    id: 2,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_2.jpg",
  },
  {
    id: 3,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_3.jpg",
  },
  {
    id: 4,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_4.jpg",
  },
  {
    id: 5,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_5.jpg",
  },
  {
    id: 6,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_6.jpg",
  },
  {
    id: 7,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_7.jpg",
  },
  {
    id: 8,
    name: "Nome do cozinheiro",
    role: "Cozinheiro",
    image: "/Cozinheiros/c_8.jpg",
  },
];

export function OurTeam() {
  return (
    <section id="nosso-time" className={styles.team}>
      <div className="container">
        <div className={styles.intro}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>
              Nosso time
              <span className={styles.line} />
            </span>

            <h2>
              Quem faz o Aruna
              <br />
              acontecer.
            </h2>
          </div>

          <p>
            Por trás de cada experiência, existem pessoas que
            compartilham o mesmo propósito: transformar cada
            encontro à mesa em uma experiência especial.
          </p>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <article key={member.id} className={styles.member}>
              <div className={styles.imageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  className={styles.image}
                />

                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}