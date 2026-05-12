-- ============================================================
-- EMERGENCY FIX: Remove the broken trigger
-- ============================================================
-- Just run these 2 lines. Nothing else needed.
-- The app code will handle profile creation instead.
-- ============================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
