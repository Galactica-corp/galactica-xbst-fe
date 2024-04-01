import { PropsWithChildren } from "react";

import { useMediaQuery } from "@uidotdev/usehooks";

import { Logo } from "shared/ui/logo";

export const MobileGuard = ({ children }: PropsWithChildren) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  if (isMobile)
    return (
      <div className="flex h-full grow flex-col items-center justify-center px-2">
        <Logo className="w-[16.8rem]" />
        <p className="mt-16 text-center">
          Currently XSBT campaign is unavailable for mobile devices. Please
          proceed using your desktop. <br />
          <br /> If you have any questions join our{" "}
          <a
            className="link text-base"
            href="https://discord.com/invite/galactica"
            rel="noreferrer"
            target="_blank"
          >
            Discord
          </a>{" "}
          and speak with the moderators and the team.
        </p>
      </div>
    );

  return <>{children}</>;
};
