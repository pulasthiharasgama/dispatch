from django.conf.urls import patterns, include, url
from rest_framework import routers
from dispatch.apps.api.urls import router
from dispatch.helpers import ThemeHelper
from dispatch.apps.content import views as content_views
from dispatch.apps.manager import urls as adminurls


urlpatterns = patterns('',
    url(r'^admin/', include(adminurls)),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^', include(ThemeHelper.get_theme_urls())),
)