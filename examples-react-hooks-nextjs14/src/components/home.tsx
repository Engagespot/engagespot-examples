import {
  useActions,
  useFeed,
  usePreferences,
  useWebPush,
} from '@engagespot/react-hooks';
import type { PreferenceChannel } from '@engagespot/react-hooks';
import Image from 'next/image';
import React from 'react';

import { MailList } from './mailList';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/seperator';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useRouter } from 'next/navigation';

const HomeComponent = () => {
  const { notifications } = useFeed();
  const actions = useActions();
  const { preferences } = usePreferences();
  const router = useRouter();
  const defaultLayout = [265, 440, 655];

  return (
    <main className="flex relative min-h-screen flex-col items-center justify-between">
      <Button
        onClick={() => {
          localStorage.clear();
          router.push('/');
        }}
        className="absolute top-5 right-8"
      >
        Logout
      </Button>

      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[700px] min-w-[450px] max-w-[450px] mt-8 items-stretch border"
      >
        <ResizablePanel
          className=""
          defaultSize={defaultLayout[1]}
          minSize={30}
        >
          <Tabs defaultValue="notifications">
            <div className="flex flex-col gap-2">
              <div className="flex items-center px-4 py-2">
                <h1 className="text-xl font-bold">Inbox</h1>
                <TabsList className="ml-auto">
                  <TabsTrigger
                    value="notifications"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    className="text-zinc-600 dark:text-zinc-200"
                  >
                    Preferences
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex gap-3 items-center px-4 py-2 self-end">
                <Button
                  onClick={() =>
                    actions.markAllAsRead({
                      pageNo: 1,
                    })
                  }
                  size={'sm'}
                  variant={'default'}
                >
                  Mark All As Read
                </Button>

                <Button
                  onClick={actions.deleteAllNotifications}
                  size={'sm'}
                  variant={'destructive'}
                >
                  Delete All
                </Button>
              </div>
            </div>

            <Separator className="mb-4" />

            <TabsContent value="notifications" className="m-0">
              {notifications.length > 0 ? (
                <MailList items={notifications} />
              ) : (
                <div className="flex justify-center items-center h-[600px]">
                  <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="preferences" className="m-0">
              <ScrollArea className="h-[600px] ">
                <div className="flex flex-col w-[95%] pb-8 gap-6 mx-auto">
                  {preferences?.categories?.map((categories) => (
                    <div key={categories.id} className="border-2 p-2 ">
                      <div className="uppercase font-semibold mb-3">
                        {categories.name}
                      </div>

                      <div className="flex flex-col gap-4 w-full">
                        {categories.channels?.map((channel) => (
                          <PreferenceChannels
                            key={`${channel.id}`}
                            categoryId={categories.id}
                            channel={channel}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default HomeComponent;

export const PreferenceChannels = ({
  categoryId,
  channel,
}: {
  channel: PreferenceChannel;
  categoryId?: number;
}) => {
  const [enabled, setEnabled] = React.useState(true);
  const { setPreferences } = usePreferences();
  const { subscribe, webPushState } = useWebPush();
  const disabled = channel.id === 'webPush' && webPushState === 'denied';

  React.useEffect(() => {
    setEnabled(channel.enabled);
  }, [channel.enabled]);

  return (
    <div className="w-full flex justify-between">
      <div className="items-center flex justify-between space-x-2 border h-fit w-full p-4">
        <Label className="flex items-center gap-2" htmlFor="channel-switch">
          {channel.name}
          <span
            className={`flex h-2 w-2  rounded-full ${enabled ? 'bg-green-400' : 'bg-red-400'}`}
          />
        </Label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Switch
                  checked={enabled}
                  disabled={disabled}
                  onCheckedChange={() => {
                    if (
                      channel.id === 'webPush' &&
                      webPushState !== 'granted'
                    ) {
                      subscribe();
                    }

                    setEnabled(!enabled);

                    setPreferences([
                      {
                        categoryId,
                        channels: [{ channel: channel.id, enabled: !enabled }],
                      },
                    ]);
                  }}
                  id="channel-switch"
                />
              </div>
            </TooltipTrigger>

            {disabled && (
              <TooltipContent>
                <p>Please allow notification in your browser</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
