import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import logo from "../assets/planet_persib_logo.png";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <div className={styles.header} style={{ backgroundColor: '#00184D' }}>
      <div className={styles.left}>
        <div>
          <Link href="/" passHref role="button">
            <Image
              src={logo}
              alt="Thirdweb Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </a>
            <p style={{ marginLeft: 8, marginRight: 8, color: "grey" }}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <a
            className={styles.mainButton}
            onClick={() => connectWithMetamask()}
            style={{ backgroundColor: '#68CCF3' }}
          >
            Connect Wallet
          </a>
        )}
      </div>
    </div>
  );
}
