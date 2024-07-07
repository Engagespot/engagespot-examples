import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StepOne from '../steps/StepOne';
import StepTwo from '../steps/StepTwo';
import StepThree from '../steps/StepThree';
import StepFour from '../steps/StepFour';
import StepFive from '../steps/StepFive';
import EventListener from '../additional/EventListener';
import Actionable from '../additional/Actionable';
import StepSix from '../steps/StepSix';

const Tutorial = () => {
   return (
      <div className='flex justify-center items-center h-[100vh]'>
         <Tabs className='w-[90%] flex gap-3 border h-[90%]' defaultValue='step_1'>
            {/* sidebar */}
            <div className='w-[30%] border-r'>
               <TabsList className='flex flex-col gap-3 h-full items-start justify-start'>
                  <TabsTrigger value='step_1' className='w-full'>
                     Step 1 - Display notifications
                  </TabsTrigger>

                  <TabsTrigger value='step_2' className='w-full'>
                     Step 2 - Add all the actions
                  </TabsTrigger>

                  <TabsTrigger value='step_3' className='w-full'>
                     Step 3 - Add unread count
                  </TabsTrigger>

                  <TabsTrigger value='step_4' className='w-full'>
                     Step 4 - Adding Infinite Scroll
                  </TabsTrigger>

                  <TabsTrigger value='step_5' className='w-full'>
                     Step 5 - Preference Manager
                  </TabsTrigger>

                  <TabsTrigger value='step_6' className='w-full'>
                     Step 6 - Shown Panel on click
                  </TabsTrigger>

                  <TabsTrigger value='actionable' className='w-full'>
                     Additional - Actionable Notifications
                  </TabsTrigger>

                  <TabsTrigger value='event_listener' className='w-full'>
                     Additional - Listen for Events
                  </TabsTrigger>
               </TabsList>
            </div>

            {/* steps */}
            <div className='flex justify-center w-[70%]'>
               <TabsContent value='step_1'>
                  <StepOne />
               </TabsContent>

               <TabsContent value='step_2'>
                  <StepTwo />
               </TabsContent>

               <TabsContent value='step_3'>
                  <StepThree />
               </TabsContent>

               <TabsContent value='step_4'>
                  <StepFour />
               </TabsContent>

               <TabsContent value='step_5'>
                  <StepFive />
               </TabsContent>

               <TabsContent value='step_6'>
                  <StepSix />
               </TabsContent>

               <TabsContent value='actionable'>
                  <Actionable />
               </TabsContent>

               <TabsContent value='event_listener'>
                  <EventListener />
               </TabsContent>
            </div>
         </Tabs>
      </div>
   );
};

export default Tutorial;
