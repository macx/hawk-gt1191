declare module '*.css'
declare module '@fontsource/*' {}
declare module '@fontsource-variable/*' {}

// Extend Astro's JSX types to include `loading` on <video>,
// which is valid per the HTML spec but missing from TypeScript's DOM types.
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video#loading
declare namespace astroHTML.JSX {
  interface VideoHTMLAttributes {
    loading?: 'lazy' | 'eager'
  }
}
