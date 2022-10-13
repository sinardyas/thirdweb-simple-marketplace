import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings, 
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";

function truncateWithEllipses(text: string, max: number) 
{
    return text.substr(0,max-1)+(text.length>max?'&hellip;':''); 
}

const Home: NextPage = () => {
  const router = useRouter();

  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    "0x2F45e691dA5Bf97e7A95F1518154505bd6297Ceb" // Your marketplace contract address here
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

    console.log(listings);

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>PlanetPersib Marketplace</h1>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create">
            <a className={styles.mainButton} style={{ textDecoration: "none" }}>
              Create A Listing
            </a>
          </Link>
        </div>

        <div className="main">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.animation_url}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={styles.name}>{listing?.asset?.name?.substring(0, 22) + '...'}</a>
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
