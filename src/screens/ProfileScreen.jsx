import { useState } from "react";
import { LISTINGS, SELLERS } from "../data/listings";
import StarRating from "../components/StarRating";
import { BackButton } from "../components/ui";

// The logged-in user's profile data (mock)
const USER_PROFILE = {
  name: "Huzaifa Usman",
  location: "Lahore",
  joinedDate: "Jan 2024",
  initials: "HU",
  sellerId: 1, // links to TechStore Pro seller data for stats
};

export default function ProfileScreen({ onBack, onViewProduct ,onNavigate }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState(USER_PROFILE);

  const seller = SELLERS[USER_PROFILE.sellerId];
  const myListings = LISTINGS.filter((l) => seller.listings.includes(l.id));

  return (
    <div className="page" style={{ maxWidth: 680, margin: "0 auto" }}>
      {onBack && <BackButton onClick={onBack} />}

      {/* ── User Info ── */}
      <section className="profile-section">
        <div className="profile-section-label">USER INFO</div>
        <div className="profile-user-card">
          {/* Avatar */}
          <div className="profile-avatar">{profile.initials}</div>
          {/* Name + location */}
          <div className="profile-name">{profile.name}</div>
          <div className="profile-meta">
            <span style={{ color: "#2563eb" }}>📍</span> {profile.location} · Joined {profile.joinedDate}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="profile-section">
        <div className="profile-section-label">STATS</div>
        <div className="profile-stats-row">
          <div className="profile-stat">
            <div className="profile-stat-value">{seller.listings.length}</div>
            <div className="profile-stat-label">Listings</div>
          </div>
          <div className="profile-stat-divider" />
          <div className="profile-stat">
            <div className="profile-stat-value">{seller.totalSales}</div>
            <div className="profile-stat-label">Sales</div>
          </div>
          <div className="profile-stat-divider" />
          <div className="profile-stat">
            <div className="profile-stat-value" style={{ color: "#f59e0b" }}>
              {seller.rating}★
            </div>
            <div className="profile-stat-label">Rating</div>
          </div>
        </div>
      </section>

      {/* ── Edit Profile Button ── */}
      <button
        className="btn btn-ghost btn-full"
        style={{ marginBottom: 24 }}
        onClick={() => setShowEditModal(true)}
      >
        Edit Profile
      </button>

      {/* ── My Listings ── */}
      <section className="profile-section">
        <div className="profile-section-label">MY LISTINGS</div>
        <div className="profile-listings-grid">
          {myListings.map((l) => (
            <div
              key={l.id}
              className="profile-listing-card"
              onClick={() => onViewProduct && onViewProduct(l.id)}
            >
              <img src={l.image} alt={l.title} />
              <div className="profile-listing-body">
                <div className="profile-listing-title">{l.title}</div>
                <div className="profile-listing-price">${l.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
          {/* Add new listing tile */}
          <div
  className="profile-listing-card profile-add-tile"
  onClick={() => onNavigate("dashboard")}
>
  <span style={{ fontSize: 22, color: "#2563eb", marginBottom: 4 }}>+</span>
  <span style={{ fontSize: 13, color: "#8b949e" }}>Add new listing</span>
</div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="profile-section">
        <div className="profile-section-label">REVIEWS</div>
        <div className="profile-reviews-list">
          {seller.reviews.map((r) => (
            <div key={r.id} className="profile-review-item">
              <div className="profile-review-header">
                <span className="profile-review-name">{r.reviewer}</span>
                <StarRating rating={r.rating} size={13} showNumber={false} />
              </div>
              <div className="profile-review-comment">{r.comment}</div>
              <div className="profile-review-date">{r.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Edit Profile Modal ── */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={(updated) => {
            setProfile({ ...profile, ...updated });
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}

function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    name: profile.name,
    location: profile.location,
    initials: profile.initials,
  });

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-title">Edit Profile</div>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            className="form-input"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Avatar Initials</label>
          <input
            className="form-input"
            maxLength={2}
            value={form.initials}
            onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase() })}
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button className="btn btn-primary btn-full" onClick={() => onSave(form)}>
            Save Changes
          </button>
          <button className="btn btn-ghost btn-full" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
