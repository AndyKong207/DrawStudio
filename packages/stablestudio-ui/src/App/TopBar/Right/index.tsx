import { Link } from "react-router-dom";
import { check, getUserInfo } from "~/api/modules/user";
import { GlobalState } from "~/GlobalState";
import { Router } from "~/Router";
import { Shortcut } from "~/Shortcut";
import { Theme } from "~/Theme";

export const Right = () => {
  const { setIsOpen } = Shortcut.Palette.use();
  const isMobileDevice = Theme.useIsMobileDevice();
  const apiKey = localStorage.getItem("stability-apiKey");
  const navigate = Router.useNavigate();

  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogin = () => {
    navigate("/signin");
  };

  const fetchUserInfo = async () => {
    const resp = await check().catch(console.error);
    if (resp) {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
  };

  return (
    <div className="flex grow basis-0 items-center justify-end gap-2">
      <>
        {!isMobileDevice && (
          <Theme.Button
            outline
            className="rounded-full"
            icon={Theme.Icon.Keyboard}
            onClick={() =>
              // cause a Ctrl+K to be triggered
              setIsOpen(true)
            }
          >
            Shortcuts
            <Shortcut.Keys keys={["Meta", "k"]} className="ml-2" />
          </Theme.Button>
        )}
        {userInfo ? (
          <Link to="/account">
            <div className="flex aspect-square h-full items-center justify-center rounded-full bg-gray-400 text-xl">
              <svg
                className="h-[24px] w-[24px]"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="PersonIcon"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
          </Link>
        ) : (
          <Link to="/signin">
            <Theme.Button color="brand" onClick={handleLogin}>
              登录
            </Theme.Button>
          </Link>
        )}

        <Link to="/settings">
          <Theme.Button
            outline
            label="Settings"
            labelPlacement="bottom"
            className="aspect-square h-[30px] w-[30px]"
            icon={Theme.Icon.Settings}
          />
        </Link>
      </>
    </div>
  );
};
