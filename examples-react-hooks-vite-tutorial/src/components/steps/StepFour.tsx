import { useActions, useFeed, useUnreadCount } from '@engagespot/react-hooks';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/seperator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellOff } from 'lucide-react';
import { InfiniteNotification } from '../notification/InfiniteNotification';

const StepFour = () => {
   const { notifications } = useFeed();
   const unreadCount = useUnreadCount();
   const actions = useActions();
   const defaultLayout = [265, 440, 655];

   return (
      <main className='flex relative min-h-screen flex-col items-center justify-between'>
         <ResizablePanelGroup
            direction='horizontal'
            onLayout={(sizes: number[]) => {
               document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
            }}
            className='h-full max-h-[700px] min-w-[450px] max-w-[450px] mt-8 items-stretch border'
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

                     <div className='flex justify-between items-center px-4 py-2'>
                        <div>
                           <Badge variant={'secondary'}>Unread Notifications - {unreadCount}</Badge>
                        </div>

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
                     <div className='h-[600px] text-center'>Preference Manager</div>
                  </TabsContent>
               </Tabs>
            </ResizablePanel>
         </ResizablePanelGroup>
      </main>
   );
};

export default StepFour;
