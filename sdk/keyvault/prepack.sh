orig=$(readlink ./keyvault-common)
rm ./keyvault-common
cp -r $orig .