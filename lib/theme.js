// Theme constants shared by the layout (boot script) and the toggle.
export const THEME_STORAGE_KEY = 'theme'

// Runs in <head> BEFORE the page paints, so a dark-mode visitor never sees a flash of the light page.
// Order of preference: saved choice (localStorage) > system preference (prefers-color-scheme) > light.
// Wrapped in try/catch because localStorage can throw (private mode, blocked cookies).
export const THEME_BOOT_SCRIPT = `(function(){try{var k='${THEME_STORAGE_KEY}',t=null;try{t=localStorage.getItem(k)}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.classList.toggle('dark',t==='dark');d.style.colorScheme=t}catch(e){}})();`
