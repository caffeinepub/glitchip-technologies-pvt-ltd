# Custom Domain Setup for Glitchip Technologies

This document outlines the steps to connect your custom domain `glitchip.in` to your Internet Computer canister.

## Prerequisites

1. Domain registered at GoDaddy: `glitchip.in`
2. Cloudflare account (free tier is sufficient)
3. Deployed canister with known canister ID

## Step 1: Transfer DNS Management to Cloudflare

1. Log in to your Cloudflare account
2. Add your domain `glitchip.in`
3. Cloudflare will provide you with nameservers (e.g., `ns1.cloudflare.com`, `ns2.cloudflare.com`)
4. Go to GoDaddy DNS settings and update nameservers to point to Cloudflare
5. Wait for DNS propagation (can take up to 24-48 hours, usually much faster)

## Step 2: Configure DNS Records in Cloudflare

Once your domain is active in Cloudflare, add the following DNS records:

### Record 1: CNAME for domain
- **Type**: CNAME
- **Name**: `@` (or `glitchip.in`)
- **Target**: `<CANISTER_ID>.icp1.io`
- **Proxy status**: DNS only (gray cloud)
- **TTL**: Auto

### Record 2: TXT record for canister verification
- **Type**: TXT
- **Name**: `_canister-id`
- **Content**: `<CANISTER_ID>`
- **TTL**: Auto

### Record 3: CNAME for certificate challenge (if required)
- **Type**: CNAME
- **Name**: `_acme-challenge`
- **Target**: `_acme-challenge.<CANISTER_ID>.icp2.io`
- **Proxy status**: DNS only (gray cloud)
- **TTL**: Auto

## Step 3: Register Custom Domain with Internet Computer

1. After DNS records are configured, go to the Internet Computer dashboard
2. Navigate to your canister settings
3. Add custom domain: `glitchip.in`
4. The system will verify the DNS records and issue a certificate

## Step 4: Verify Setup

1. Wait for DNS propagation (usually 5-30 minutes)
2. Visit `https://glitchip.in` in your browser
3. Verify SSL certificate is valid
4. Test all pages and functionality

## Placeholder Values

Replace the following placeholders with actual values after deployment:

- `<CANISTER_ID>`: Your backend canister ID (e.g., `rrkah-fqaaa-aaaaa-aaaaq-cai`)

## Troubleshooting

- **DNS not resolving**: Wait longer for propagation, verify nameservers are updated
- **Certificate errors**: Ensure ACME challenge CNAME is correct
- **404 errors**: Verify `.well-known/ic-domains` file contains `glitchip.in`
- **Mixed content warnings**: Ensure all assets use HTTPS

## Support

For Internet Computer custom domain support:
- Documentation: https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/
- Forum: https://forum.dfinity.org/

For Cloudflare support:
- Documentation: https://developers.cloudflare.com/dns/
