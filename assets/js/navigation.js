const mobileBreakpoint = window.matchMedia("(max-width: 960px)");

export function initNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav");

  if (!menuButton || !navigation) return;

  let isOpen = false;

  const setOpen = (nextOpen, { returnFocus = false } = {}) => {
    isOpen = nextOpen;
    const mobile = mobileBreakpoint.matches;

    navigation.classList.toggle("nav-open", mobile && isOpen);
    menuButton.classList.toggle("menu-toggle-open", mobile && isOpen);
    menuButton.setAttribute("aria-expanded", String(mobile && isOpen));
    menuButton.setAttribute("aria-label", mobile && isOpen ? "Закрыть меню" : "Открыть меню");
    navigation.setAttribute("aria-hidden", String(mobile && !isOpen));
    navigation.inert = mobile && !isOpen;
    document.body.classList.toggle("menu-open", mobile && isOpen);

    if (mobile && isOpen) {
      navigation.querySelector("a")?.focus();
    } else if (returnFocus && mobile) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => setOpen(!isOpen, { returnFocus: isOpen }));
  navigation.addEventListener("click", (event) => {
    if (event.target === navigation) {
      setOpen(false);
      return;
    }
    if (event.target.closest("a, button")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen || !mobileBreakpoint.matches) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false, { returnFocus: true });
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [...navigation.querySelectorAll("a, button:not([disabled])"), menuButton];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const handleBreakpointChange = () => setOpen(false);
  if (mobileBreakpoint.addEventListener) {
    mobileBreakpoint.addEventListener("change", handleBreakpointChange);
  } else {
    mobileBreakpoint.addListener(handleBreakpointChange);
  }

  setOpen(false);
}
