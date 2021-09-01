 if git diff --exit-code; then
  git add -u
  git commit -s -m 'update contributors'
  git push
fi