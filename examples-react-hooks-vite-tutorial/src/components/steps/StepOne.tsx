import { useFeed } from '@engagespot/react-hooks';

import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/seperator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { BellOff } from 'lucide-react';
import { SimpleNotification } from '../notification/SimpleNotification';

const StepOne = () => {
   const { notifications } = useFeed();
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
                     </div>
                  </div>

                  <Separator className='mb-4' />

                  <TabsContent value='notifications' className='m-0'>
                     {notifications.length > 0 ? (
                        <SimpleNotification items={notifications} />
                     ) : (
                        <div className='flex justify-center items-center h-[600px]'>
                           <BellOff size={200} />
                        </div>
                     )}
                  </TabsContent>
               </Tabs>
            </ResizablePanel>
         </ResizablePanelGroup>
      </main>
   );
};

export default StepOne;
