#!/bin/bash
set -e

until mysql -h"mysql" -uroot -proot -e 'SELECT 1'; do
 echo "Waiting for MySQL..."
 sleep 1
done

echo "MySQL is ready."
exec "$@"