import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useActions, useFeed, usePreferences, useUnreadCount } from '@engagespot/react-hooks';

import { Button } from '@/components/ui/button';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/seperator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, BellOff } from 'lucide-react';
import { InfiniteNotification } from '../notification/InfiniteNotification';
import { PreferenceChannels } from '../notification/PreferenceChannels';

const StepSixContent = () => {
   const { notifications } = useFeed();
   const actions = useActions();
   const defaultLayout = [265, 440, 655];
   const { preferences } = usePreferences();

   return (
      <main className='flex relative max-h-[650px] flex-col items-center justify-between'>
         <ResizablePanelGroup
            direction='horizontal'
            onLayout={(sizes: number[]) => {
               document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
            }}
            className='h-full max-h-[600px] min-w-[450px] max-w-[450px] mt-8 items-stretch border'
         >
            <ResizablePanel className='' defaultSize={defaultLayout[1]} minSize={30}>
               <Tabs defaultValue='notifications'>
                  <div className='flex flex-col gap-2'>
                     <div className='flex items-center px-4 py-2'>
                        <h1 className='text-xl font-bold'>Inbox</h1>
                        <TabsList className='ml-auto'>
                           <TabsTrigger
                              value='notifications'
                              className='text-zinc-600 dark:text-zinc-200'
                           >
                              Notifications
                           </TabsTrigger>
                           <TabsTrigger
                              value='preferences'
                              className='text-zinc-600 dark:text-zinc-200'
                           >
                              Preferences
                           </TabsTrigger>
                        </TabsList>
                     </div>

                     <div className='flex justify-end items-center px-4 py-2'>
                        <div className='flex gap-3 items-center'>
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
                  </div>

                  <Separator className='mb-4' />

                  <TabsContent value='notifications' className='m-0'>
                     {notifications.length > 0 ? (
                        <InfiniteNotification items={notifications} />
                     ) : (
                        <div className='flex justify-center items-center h-[600px]'>
                           <BellOff size={200} />
                        </div>
                     )}
                  </TabsContent>

                  <TabsContent value='preferences' className='m-0'>
                     <ScrollArea className='h-[600px] '>
                        <div className='flex flex-col w-[95%] pb-8 gap-6 mx-auto'>
                           {preferences?.categories?.map((categories) => (
                              <div key={categories.id} className='border-2 p-2 '>
                                 <div className='uppercase font-semibold mb-3'>
                                    {categories.name}
                                 </div>

                                 <div className='flex flex-col gap-4 w-full'>
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

const StepSix = () => {
   const unreadCount = useUnreadCount();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' disabled={false}>
               <div className='relative h-8 w-8 top-2'>
                  <Bell className='h-6 w-6' />

                  <span className='bg-red-500 rounded-full p-1 absolute -top-3 -right-1 w-6 h-6 text-sm flex justify-center items-center'>
                     {unreadCount}
                  </span>
               </div>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent align='center'>
            <DropdownMenuItem className='focus:bg-white'>
               <StepSixContent />
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default StepSix;
