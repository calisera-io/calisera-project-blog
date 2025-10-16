export const remark = () => ({
  use: () => ({
    process: () => Promise.resolve({ toString: () => '<h1>Content</h1>' })
  })
});
