import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings, 
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useState } from "react";

function truncateWithEllipses(text: string, max: number) 
{
    return text.substr(0,max-1)+(text.length>max?'&hellip;':''); 
}

const Home: NextPage = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('VIP_PASS');

  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    "0x2F45e691dA5Bf97e7A95F1518154505bd6297Ceb" // Your marketplace contract address here
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);
  const wearableListing: any[] = [];
  const landListing: any[] = [];

  return (
    <>
      {/* Content */}
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className="h-12 text-3xl font-bold my-4 mx-6">PlanetPersib Marketplace</h1>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create">
            <a className={styles.mainButton} style={{ textDecoration: "none" }}>
              Sell NFT
            </a>
          </Link>
        </div>

        <div className="main">
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              <>
              <div style={{borderBottom: '2px solid #eaeaea'}} className="mb-4">
                <ul className='flex cursor-pointer gap-1'>
                    <li onClick={() => setActiveTab('VIP_PASS')}
                      className={`py-2 px-6 bg-[#68CCF3] rounded-t-lg font-semibold ${activeTab === 'VIP_PASS' ? '' : 'text-gray-500 bg-gray-200'}`}>VIP Pass</li>
                    <li onClick={() => setActiveTab('WEARABLE')}
                      className={`py-2 px-6 bg-[#68CCF3] rounded-t-lg font-semibold ${activeTab === 'WEARABLE' ? '' : 'text-gray-500 bg-gray-200'}`}>Wearable</li>
                    <li onClick={() => setActiveTab('LAND')}
                      className={`py-2 px-6 bg-[#68CCF3] rounded-t-lg font-semibold ${activeTab === 'LAND' ? '' : 'text-gray-500 bg-gray-200'}`}>Land</li>
                </ul>
              </div>

              {activeTab === 'VIP_PASS' && (
                <div className={styles.listingGrid}>
                  {listings?.map((listing) => (
                    <div
                      key={listing.id}
                      className={`${styles.listingShortView} pb-4`}
                      onClick={() => router.push(`/listing/${listing.id}`)}
                    >
                      <MediaRenderer
                        src={listing.asset.animation_url}
                        style={{
                          borderRadius: 16,
                          position: 'unset',
                          // Fit the image to the container
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <h2 className={styles.nameContainer}>
                        <Link href={`/listing/${listing.id}`}>
                          <a className={styles.name}>{listing?.asset?.name?.substring(0, 15) + '...'}</a>
                        </Link>
                      </h2>

                      <p>
                        <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                        {listing.buyoutCurrencyValuePerToken.symbol}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'WEARABLE' && (
                <div className={styles.listingGrid}>
                  {wearableListing?.map((listing) => (
                    <div
                      key={listing.id}
                      className={`${styles.listingShortView} pb-4`}
                      onClick={() => router.push(`/listing/${listing.id}`)}
                    >
                      <MediaRenderer
                        src={listing.asset.animation_url}
                        style={{
                          borderRadius: 16,
                          position: 'unset',
                          // Fit the image to the container
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <h2 className={styles.nameContainer}>
                        <Link href={`/listing/${listing.id}`}>
                          <a className={styles.name}>{listing?.asset?.name?.substring(0, 15) + '...'}</a>
                        </Link>
                      </h2>

                      <p>
                        <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                        {listing.buyoutCurrencyValuePerToken.symbol}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'LAND' && (
                <div className={styles.listingGrid}>
                  {landListing?.map((listing) => (
                    <div
                      key={listing.id}
                      className={`${styles.listingShortView} pb-4`}
                      onClick={() => router.push(`/listing/${listing.id}`)}
                    >
                      <MediaRenderer
                        src={listing.asset.animation_url}
                        style={{
                          borderRadius: 16,
                          position: 'unset',
                          // Fit the image to the container
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      <h2 className={styles.nameContainer}>
                        <Link href={`/listing/${listing.id}`}>
                          <a className={styles.name}>{listing?.asset?.name?.substring(0, 15) + '...'}</a>
                        </Link>
                      </h2>

                      <p>
                        <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                        {listing.buyoutCurrencyValuePerToken.symbol}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
