console.log('🚀 AI E-Commerce Marketplace Worker started...');
console.log('Monitoring background queues (AI embeddings, image processing, analytics, seller payouts)...');

process.on('SIGINT', () => {
  console.log('Shutting down worker gracefully...');
  process.exit(0);
});
