import { LISTINGS, SELLERS } from "../data/listings";
import { BackButton } from "../components/ui";

export default function SellerProfileScreen({ sellerId, onBack, onViewProduct }) {
  const seller = SELLERS[sellerId];
  const listings = LISTINGS.filter((l) => seller.listings.includes(l.id));

  return (
    <div className="page">
      <BackButton onClick={onBack} />

      <div className="seller-profile-layout">
        {/* Left: seller info card */}
        <div className="seller-profile-card">
          <div className="seller-profile-name">{seller.name}</div>
          <div className="profile-row">
            <div className="profile-key">Member Since</div>
            <div className="profile-val">{seller.since}</div>
          </div>
          <div className="profile-row">
            <div className="profile-key">Location</div>
            <div className="profile-val">{seller.location}</div>
          </div>
          <div className="profile-row">
            <div className="profile-key">Total Listings</div>
            <div className="profile-val">{seller.listings.length}</div>
          </div>
        </div>

        {/* Right: seller's listings */}
        <div>
          <div className="seller-listings-title">{seller.name}'s Listings</div>
          <div className="seller-listings-grid">
            {listings.map((l) => (
              <div
                key={l.id}
                className="listing-card"
                onClick={() => onViewProduct(l.id)}
              >
                <img src={l.image} alt={l.title} />
                <div className="listing-card-body">
                  <div className="listing-card-title">{l.title}</div>
                  <div className="listing-price">
                    ${l.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
