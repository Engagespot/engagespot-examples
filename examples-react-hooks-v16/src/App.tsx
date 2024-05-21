import {
  type EngagespotNotification,
  useEvent,
  useWebPush,
  useActions,
  usePreferences,
  useFeed,
  useUnreadCount,
} from "@engagespot/react-hooks";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { NotificationsInifiniteScroll } from "./components/InifiniteScroll";
import { Popper } from "./components/Popper";
import { PreferenceChannels } from "./components/PreferenceChannel";
import { sendTestNotification } from "./helpers";
import { Bookmark } from "./icons/Bookmark";
import { Notification } from "./icons/Notification";
import { Profile } from "./icons/Profile";
import { useCurrentUser, useSetCurrentUser } from "./providers/UserProvider";

const notify = (notification: EngagespotNotification) =>
  toast.success(`New Notification: ${notification.title}`);

function App() {
  const { notifications, loading, loadMore, refresh, hasMore } = useFeed();
  const [panelView, setPanelView] = useState<"notifications" | "preferences">(
    "preferences",
  );

  const unreadCount = useUnreadCount();

  const { preferences, channels } = usePreferences();

  const [message, setMessage] = useState("Testing...");
  const userId = useCurrentUser();
  const setUserId = useSetCurrentUser();
  const { markAsSeen, markAllAsRead, deleteAllNotifications } = useActions();
  const { subscribe, clearWebPushSubscription } = useWebPush();

  useEvent("notificationReceive", (notification) => {
    notify(notification.notification);
  });

  console.log("unread count is ", unreadCount, preferences, channels);

  return (
    <>
      <Toaster />
      <div className="container">
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <button className="p-2 hover:bg-slate-200" onClick={loadMore}>
            Load Notifications
          </button>
          <button className="p-2 hover:bg-slate-200 ml-3" onClick={refresh}>
            Refresh
          </button>
          <button
            className="p-2 hover:bg-slate-200 ml-3"
            onClick={markAllAsRead}
          >
            markAllAsRead
          </button>
          <button
            className="p-2 hover:bg-slate-200 ml-3"
            onClick={deleteAllNotifications}
          >
            deleteAllNotifications
          </button>
          <button
            className="p-2 hover:bg-slate-200 ml-3"
            onClick={() => {
              subscribe();
            }}
          >
            Enable WebPush
          </button>
          <button
            className="p-2 hover:bg-slate-200 ml-3"
            onClick={() => {
              clearWebPushSubscription();
            }}
          >
            Clear WebPush
          </button>
          <button
            className="p-2 hover:bg-slate-200 ml-3"
            onClick={() => {
              sendTestNotification({ userId, message });
            }}
          >
            Send Test Notification
          </button>
          <button
            className="p-2 hover:bg-slate-200 ml-3"
            onClick={() => markAsSeen({ limit: 15, pageNo: 1 })}
          >
            Mark As Seen
          </button>
          {/* <Engagespot
            userId={import.meta.env.VITE_USER_ID}
            apiKey={import.meta.env.VITE_API_KEY}
          /> */}
        </div>
        <nav className="mb-2 border border-t-0 border-l-0 border-r-0 border-gray-200">
          <ul className="flex flex-row items-center gap-5 p-3 ">
            <li className="p-2 hover:bg-slate-400">Home</li>
            <input
              className="p-1 mr-auto rounded outline-gray-400 bg-slate-200"
              type="text"
              placeholder="Search"
            ></input>
            <li>
              <button className="p-2 hover:bg-slate-200">
                <Bookmark />
              </button>
            </li>
            <li>
              <p>Current User: {userId}</p>
              <input
                className="p-1 mr-5 rounded outline-gray-400 bg-slate-200"
                type="text"
                placeholder="Enter message to send"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></input>
              <select
                className="p-1 mr-5 rounded outline-gray-400 bg-slate-200"
                defaultValue={import.meta.env.VITE_USER_ID}
                onChange={(event) => {
                  setUserId(event.target.value);
                }}
              >
                <option value={import.meta.env.VITE_USER_ID}>User 1</option>
                <option value={import.meta.env.VITE_USER_ID_2}>User 2</option>
              </select>
            </li>
            <li>
              <Popper
                renderButton={(open) => {
                  return (
                    <>
                      <div className="flex">
                        <Notification />
                        {unreadCount && (
                          <span className="text-red-500 text-md">•</span>
                        )}
                      </div>
                      <ChevronDownIcon
                        className={clsx(
                          !open && "opacity-0",
                          "size-5",
                          open && "rotate-180",
                        )}
                      />
                    </>
                  );
                }}
              >
                {(open) => {
                  return (
                    <>
                      <div className="flex gap-3 text-sm justify-end">
                        <button
                          className={`border border-black rounded-lg p-2 ${
                            panelView === "notifications"
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }`}
                          onClick={() => setPanelView("notifications")}
                        >
                          Notifications
                        </button>
                        <button
                          className={`border border-black rounded-lg p-2 ${
                            panelView === "preferences"
                              ? "bg-black text-white"
                              : "bg-white text-black"
                          }`}
                          onClick={() => setPanelView("preferences")}
                        >
                          Preferences
                        </button>
                      </div>

                      {panelView === "preferences" ? (
                        <div className="flex flex-col gap-4">
                          {preferences?.categories?.map((categories) => (
                            <div
                              key={categories.name}
                              className="border border-black p-2 rounded-lg"
                            >
                              <div className="uppercase font-semibold mb-3">
                                {categories.name}
                              </div>

                              <div className="flex flex-col gap-4">
                                {categories.channels?.map((channel) => (
                                  <PreferenceChannels
                                    key={channel.id}
                                    categoryId={categories.id}
                                    channel={channel}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <NotificationsInifiniteScroll
                          loading={loading}
                          loadMore={loadMore}
                          refresh={refresh}
                          notifications={notifications}
                          hasMore={hasMore}
                        />
                      )}
                    </>
                  );
                }}
              </Popper>
            </li>
            <li>
              <button className="p-2 hover:bg-slate-200">
                <Profile />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;
