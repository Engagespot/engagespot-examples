import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

import { Notification } from "../icons/Notification";

type PopperTypes = {
  children: (open: boolean) => React.ReactNode;
  renderButton?: (open: boolean) => React.ReactNode;
};

export function Popper({ children, renderButton }: PopperTypes) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <>
        <div
          onClick={() => setOpen((open) => !open)}
          className="flex flex-col items-center"
        >
          {renderButton ? (
            renderButton(open)
          ) : (
            <>
              <Notification />
              <ChevronDownIcon
                className={clsx(
                  !open && "opacity-0",
                  "size-5",
                  open && "rotate-180",
                )}
              />
            </>
          )}
        </div>
        <div
          id="engagespot-scroll-root"
          className="px-4 py-6 mt-1 overflow-auto rounded-lg shadow-md w-96 bg-gray-50 flex flex-col gap-4"
        >
          {children(open)}
        </div>
      </>
    </>
  );
}
