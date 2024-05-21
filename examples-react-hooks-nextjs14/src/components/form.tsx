'use client';

import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { LoaderIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useRouter } from 'next/navigation';
import React from 'react';

const formSchema = z
  .object({
    apiKey: z.string(),
    userId: z.string(),
    environment: z.boolean(),
  })
  .required();

export function SigninForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setloading] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      apiKey: '',
      environment: false,
    },
  });

  function createNewDevice() {
    if (typeof window !== 'undefined') {
      const savedId = localStorage.getItem('_engagespotDeviceId');
      if (savedId) return savedId;
    }

    const deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );

    return deviceId;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setloading(true);

    const baseUrl = values.environment
      ? 'https://api.engagespot.co'
      : 'https://coreapi-refactored.staging.engagespot.co';

    const deviceId = createNewDevice();

    try {
      await axios.post(
        `${baseUrl}/v3/sdk/connect`,
        {
          deviceType: 'browser',
          browserType: 'ie',
        },
        {
          headers: {
            'X-ENGAGESPOT-API-KEY': values.apiKey,
            'X-ENGAGESPOT-USER-ID': values.userId,
            'X-ENGAGESPOT-DEVICE-ID': deviceId,
          },
        },
      );

      localStorage.setItem('apiKey', values.apiKey);
      localStorage.setItem('userId', values.userId);
      localStorage.setItem('baseUrl', baseUrl);
      localStorage.setItem('_engagespotDeviceId', deviceId);

      setloading(false);
      router.push('/inbox');
    } catch (err: any) {
      setloading(false);

      toast({
        title: err.response.data.status,
        description: err.response.data.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-1/4 mx-auto border p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="mt-10 scroll-m-20  pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
              Engagespot Hooks Connect
            </h2>

            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your user id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Api Key</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your api key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="environment"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Label htmlFor="airplane-mode">Production</Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="airplane-mode"
                  />
                </div>
              )}
            />

            <Button disabled={loading} className="flex gap-2" type="submit">
              <span>Connect</span>
              {loading && <LoaderIcon className="animate-spin" />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
