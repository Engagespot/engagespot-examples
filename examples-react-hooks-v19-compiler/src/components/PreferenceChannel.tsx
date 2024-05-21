import type { PreferenceChannel } from "@engagespot/react-hooks";
import { usePreferences, useWebPush } from "@engagespot/react-hooks";
import { useEffect, useState } from "react";

export const PreferenceChannels = ({
  channel,
  categoryId,
}: {
  channel: PreferenceChannel;
  categoryId?: number;
}) => {
  const [enabled, setEnabled] = useState(true);
  const { setPreferences } = usePreferences();
  const { webPushState, subscribe } = useWebPush();

  useEffect(() => {
    setEnabled(channel.enabled);
  }, [channel.enabled]);

  return (
    <div className="w-full flex justify-between">
      <div className={"flex gap-2 items-center text-sm"}>
        {channel.name}

        <span
          className={`w-4 h-4 rounded-full ${enabled ? "bg-green-400" : "bg-red-400"}`}
        ></span>
      </div>

      <button
        className={`rounded-md p-2 py-1 text-sm ${!enabled ? "bg-green-500" : "bg-red-500"}
         ${channel.id === "webPush" && webPushState === "denied" ? "opacity-25" : ""}`}
        onClick={() => {
          if (channel.id === "webPush" && webPushState !== "granted") {
            subscribe();
            return;
          }

          setEnabled(!enabled);
          setPreferences([
            {
              categoryId,
              channels: [{ channel: channel.id, enabled: !enabled }],
            },
          ]);
        }}
      >
        {enabled ? "Disable" : "Enable"}
      </button>
    </div>
  );
};
