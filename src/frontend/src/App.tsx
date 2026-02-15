import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import MarketingLayout from './components/MarketingLayout';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <MarketingLayout>
      <Outlet />
    </MarketingLayout>
  ),
});

// Define all routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const whyUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/why-us',
  component: WhyUsPage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsPage,
});

const careersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/careers',
  component: CareersPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-and-conditions',
  component: TermsAndConditionsPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  whyUsRoute,
  productsRoute,
  careersRoute,
  contactRoute,
  termsRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
