import { useActions, type useScrollableFeed } from '@engagespot/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Dot } from '../icons/Dot';

type ScrollableFeedProps = ReturnType<typeof useScrollableFeed>;

export const NotificationsInifiniteScroll = ({
  loadMore,
  refresh,
  notifications,
  hasMore,
}: ScrollableFeedProps) => {
  const actions = useActions();

  return (
    <InfiniteScroll
      dataLength={notifications.length} //This is important field to render the next data
      next={() => {
        console.log('firing');
        loadMore();
      }}
      height={400}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={refresh}
    >
      {notifications.map(notification => {
        return (
          <div
            key={notification.id}
            onClick={() => {
              actions.markAsRead(notification.id as number);
            }}
            className="flex flex-row gap-3 px-1 py-2 border border-t-0 border-l-0 border-r-0 border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <div className="self-center p-5 bg-orange-300 rounded-full"></div>
            <div>
              <h5>{notification.title}</h5>
              <p>{notification.message}</p>
              <span>{notification.createdAt}</span>
              {notification.clickedAt == null && (
                <span className="">
                  <Dot />
                </span>
              )}
              <button
                className="p-2 text-lg font-thin text-gray-400 hover:bg-gray-200"
                onClick={() => {
                  actions.deleteNotification(notification.id as number);
                }}
              >
                &times;
              </button>
              {(notification.blocks?.length ?? 0) > 0 && (
                <button
                  onClick={() =>
                    actions.changeState({
                      id: notification.id as number,
                      state: 'state_2',
                    })
                  }
                  className="p-2 text-base font-thin text-black border border-black rounded-lg"
                >
                  Change State
                </button>
              )}
            </div>
          </div>
        );
      })}
    </InfiniteScroll>
  );
};
