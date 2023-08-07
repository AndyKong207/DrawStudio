import { Router } from "~/Router";
import { Shortcut } from "~/Shortcut";
import { Theme } from "~/Theme";

import { BottomBar } from "./BottomBar";
import { Providers } from "./Providers";
import { Sidebar, Sidebars } from "./Sidebar";
import { TopBar } from "./TopBar";

export function App() {
  const isMobileDevice = Theme.useIsMobileDevice();
  const [isShowTopBar, setIsShowTopBar] = useState(true);
  useEffect(() => {
    const paths = [
      "/draw-studio/index",
      "/draw-studio/signin",
      "/draw-studio/signin-sms",
      "/draw-studio/signup",
      "/draw-studio/reset-password",
    ];
    setIsShowTopBar(!paths.includes(window.location.pathname));
  }, []);

  if (window.location.pathname === "/") window.location.href = "/draw-studio";

  return useMemo(
    () => (
      <Providers>
        <div className="absolute left-0 top-0 -z-50 h-screen w-screen dark:bg-zinc-800" />
        <div className="absolute left-0 top-0 flex h-screen w-screen flex-col text-white sm:overflow-x-auto">
          <Shortcut.Palette />
          {isShowTopBar && <TopBar />}
          <Sidebars />
          <div className="flex min-h-0 grow overflow-auto sm:min-w-[1000px]">
            <Sidebar position="left" />
            <div className="shrink grow overflow-y-auto">
              <Router />
            </div>
            <Sidebar position="right" />
          </div>
          {isMobileDevice && <BottomBar />}
        </div>
      </Providers>
    ),
    [isMobileDevice, isShowTopBar]
  );
}

export declare namespace App {
  export { Sidebar, TopBar };
}

export namespace App {
  App.Sidebar = Sidebar;
  App.TopBar = TopBar;
}
