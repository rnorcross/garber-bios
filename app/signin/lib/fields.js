// Every editable field and its character limit. Keep in sync with PLATFORMS in public/app.js.
export const FIELD_LIMITS = {
  website: 1000, facebook: 255, instagram: 150, tiktok: 80, pinterest: 160,
  linkedin: 220, linkedinOverview: 2000, gbp: 750, youtube: 1000,
  yelpSpecialties: 1500, yelpHistory: 1000, bbb: 900,
};
// Server-side cap so one bad request can't store a novel. Over-limit copy is allowed (the UI flags it).
export const MAX_STORED_CHARS = 20000;
